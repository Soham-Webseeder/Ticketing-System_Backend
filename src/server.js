require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

const developer = require('./routes/developerRoutes.js');
const client = require('./routes/clientRoutes.js');
const project = require('./routes/projectRoutes.js');
const ticket = require('./routes/ticketRoutes.js');
const auth = require('./routes/authRoute.js');

const promClient = require("prom-client");

const app = express();

// ✅ Default metrics (CPU, memory etc.)
promClient.collectDefaultMetrics();

// ✅ Custom metrics
const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"]
});

const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
});

const errorCounter = new promClient.Counter({
  name: "http_errors_total",
  help: "Total number of failed requests",
});

// ✅ Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Metrics middleware (ONLY ONE)
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    const route = req.route?.path || req.originalUrl;

    httpRequestCounter.inc({
      method: req.method,
      route: route,
      status: res.statusCode
    });

    end({
      method: req.method,
      route: route,
      status: res.statusCode
    });

    if (res.statusCode >= 400) {
      errorCounter.inc();
    }
  });

  next();
});

// ✅ Routes
app.use('/api/developer', developer);
app.use('/api/client', client);
app.use('/api/project', project);
app.use('/api/ticket', ticket);
app.use('/api/auth', auth);

// ✅ DB connect
connectDB();

// ✅ Test route
app.get('/', (req, res) => {
  res.json({ message: 'Ticket System Backend is running fine!' });
});

// ✅ Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
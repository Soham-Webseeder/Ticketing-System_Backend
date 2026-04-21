require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const developer=require('./routes/developerRoutes.js');
const client=require('./routes/clientRoutes.js');
const project=require('./routes/projectRoutes.js');
const ticket=require('./routes/ticketRoutes.js');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/developer',developer);
app.use('/api/client',client);
app.use('/api/project',project);
app.use('/api/ticket',ticket);

// DB connect
connectDB();

// Basic route (test ke liye)
app.get('/', (req, res) => {
  res.json({ message: 'Ticket System Backend is running fine!' });
});

// Routes baad mein add karenge
// app.use('/api/users', userRoutes);
// app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
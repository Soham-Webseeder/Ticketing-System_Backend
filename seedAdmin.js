const mongoose=require("mongoose");
const dotenv=require("dotenv");
const Admin=require("./src/models/AdminSchema.js");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB NAME:", mongoose.connection.name);

    
    const existing = await Admin.findOne({ email: "admin@gmail.com" });

    if (existing) {
      console.log("SuperAdmin already exists");
      process.exit();
    }

    const admin = new Admin({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: "admin123", 
      modules: ["client", "developer", "project", "dashboard", "ticket"]
    });

    await admin.save();

    console.log("SuperAdmin created successfully");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
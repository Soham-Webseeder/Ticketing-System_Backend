const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "admin",
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  password: {
    type: String,
    required: true,
  },

 
  modules: [{
    type: String,
    enum: ["client", "developer", "project", "dashboard", "ticket"]
  }]

}, { timestamps: true });



adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
const Admin =require("../models/AdminSchema.js");
const Client =require("../models/ClientModel.js");
const Developer=require("../models/DeveloperModel.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

 const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const normalizedEmail = email.toLowerCase().trim();

    let user =
      await Admin.findOne({ email: normalizedEmail }) ||
      await Client.findOne({ email: normalizedEmail }) ||
      await Developer.findOne({ email: normalizedEmail });

      console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports={login};
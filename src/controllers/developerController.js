import Developer from "../models/DeveloperModel.js";

export const createDeveloper=async(req,res)=>{
    try{
const {name,email,password,phone}=req.body;

const existing = await Developer.findOne({ email });

if (existing) {
  return res.status(400).json({ message: "Email already exists" });
}

const developer=await Developer.create({
    name,email,password,phone
});

return res.status(201).json({message:"Developer created successfully",developer});
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

export const getDeveloper = async (req, res) => {
  try {
    const developer = await Developer.find({}).select("-password");

    return res.status(200).json(developer);

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

export const updateDeveloper = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    const developer = await Developer.findById(id);

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    // ✅ Email duplicate check (excluding current developer)
    if (email && email !== developer.email) {
      const existingEmail = await Developer.findOne({
        email,
        _id: { $ne: id }
      });

      if (existingEmail) {
        return res.status(400).json({
          message: "Email already exists"
        });
      }

      developer.email = email;
    }

    developer.name = name || developer.name;
    developer.phone = phone || developer.phone;

    if (password) {
      developer.password = password;
    }

    await developer.save();

    developer.password = undefined;

    return res.status(200).json({
      message: "Developer updated successfully",
      developer
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

export const deleteDeveloper=async(req,res)=>{
try{
const {id}=req.params;

const developer=await Developer.findByIdAndDelete(id);
if (!developer) {
  return res.status(404).json({ message: "Developer not found" });
}

return res.json({message:"Developer deleted successfully"});
}catch(err){
        return res.status(500).json({message:err.message})
    }
}

export const getSingleDeveloper = async (req, res) => {
  try {
    const { id } = req.params;

    const developer = await Developer.findById(id).select("-password");

    if (!developer) {
      return res.status(404).json({
        message: "Developer not found"
      });
    }

    return res.status(200).json(developer);

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};
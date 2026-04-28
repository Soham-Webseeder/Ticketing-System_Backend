const Client=require("../models/ClientModel.js");

 const createClient=async(req,res)=>{
    try{
const {name,email,password,phone}=req.body;

const existingClient=await Client.findOne({email});

if(existingClient){
    return res.status(400).json({message:"Client already registered"})
}

await Client.create({
    name,email,password,phone
})

return res.status(201).json({message:"Client created successfully"});
    }catch(err){
        return res.json({message:err.message});
    }
}

const getClient=async(req,res)=>{
    try{
const clients=await Client.find({}).select("-password");

return res.status(200).json(clients);
    }catch(err){
        return res.json({message:err.message});
    }
}

 const singleClient=async(req,res)=>{
    try{
const {id}=req.params;

 if (req.user.role === "client" && req.user.id !== id) {
      return res.status(403).json({
        message: "You can only view your own profile"
      });
    }

const client=await Client.findById(id).select("-password");

if(!client){
    return res.status(404).json({message:"Client not found"});
}



return res.status(200).json(client);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

 const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    const client= await Client.findById(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

     if (req.user.role === "client" && req.user.id !== id) {
      return res.status(403).json({
        message: "You can update only your own profile"
      });
    }

    // ✅ Email duplicate check (excluding current developer)
    if (email && email !== client.email) {
      const existingEmail = await Client.findOne({
        email,
        _id: { $ne: id }
      });

      if (existingEmail) {
        return res.status(400).json({
          message: "Email already exists"
        });
      }

      client.email = email;
    }

    client.name = name || client.name;
    client.phone = phone || client.phone;

    if (password) {
      client.password = password;
    }

    await client.save();

    client.password = undefined;

    return res.status(200).json({
      message: "Client updated successfully",
      client
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

 const deleteClient=async(req,res)=>{
    try{
const {id}=req.params;

const client=await Client.findByIdAndDelete(id);

if(!client){
    return res.status(404).json({message:"Client not found"});
}



return res.status(200).json({message:"Client deleted successfully"});
    } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

module.exports={createClient,updateClient,deleteClient,getClient,singleClient};
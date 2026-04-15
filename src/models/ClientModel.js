const mongoose=require("mongoose");
const bcrypt=requite("bcrypt");

const clientSchema=new mongoose.Schema({
    customId:{
type:String,
unique:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
phone:{
    type:String
},
status:{
    type:String,
    enum:["active","inactive"],
default:"inactive"
},
totalProjects:{
    type:Number,
    default:0
},
totalTickets:{
    type:Number,
    default:0
},
recentActivity:[{
    type:String,
}],
},{timestamps:true});

clientSchema.pre("save",async function (next){
    if(!this.isModified("password"))  return next();

const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);
next();
})

clientSchema.pre("save",async function(next){
    if(this.customId) return next();

    const count=await mongoose.model("Client").countDocuments();
const newId=count+1;
this.customId=`CLI${String(newId).padStart(4,"0")}`
next();
})

const Client=mongoose.model("Client",clientSchema);

module.exports=Client;
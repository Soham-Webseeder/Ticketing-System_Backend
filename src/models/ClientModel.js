import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

clientSchema.pre("save",async function (){
    if(!this.isModified("password"))  return;

const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);

})

clientSchema.pre("save",async function(){
    if(this.customId) return;

    const count=await mongoose.model("Client").countDocuments();
const newId=count+1;
this.customId=`CLI${String(newId).padStart(4,"0")}`

})

const Client=mongoose.model("Client",clientSchema);

export default Client;
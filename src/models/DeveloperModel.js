const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const developerSchema=new mongoose.Schema({
    customId:{
        type:String,
        
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
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
        default:"active"
    },
    role:{
        type:String,
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
        type:String
    }],
    role: {
  type: String,
  default: "developer"
}
},{timestamps:true});

developerSchema.pre("save",async function (){
    if(!this.isModified("password"))  return;

const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);

})

developerSchema.pre("save",async function(){
    if(this.customId) return ;

    const count=await mongoose.model("Developer").countDocuments();
const newId=count+1;
this.customId=`DEV${String(newId).padStart(4,"0")}`

})

const Developer=mongoose.model("Developer",developerSchema);

module.exports= Developer;

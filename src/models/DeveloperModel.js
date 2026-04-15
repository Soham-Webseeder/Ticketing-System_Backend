const mongoose=require("mongoose");

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
        default:"inactive"
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
},{timestamps:true});

developerSchema.pre("save",async function (next){
    if(!this.isModified("password"))  return next();

const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);
next();
})

developerSchema.pre("save",async function(next){
    if(this.customId) return next();

    const count=await mongoose.model("Developer").countDocuments();
const newId=count+1;
this.customId=`DEV${String(newId).padStart(4,"0")}`
next();
})

const Developer=mongoose.model("Developer",developerSchema);

module.exports= Developer;

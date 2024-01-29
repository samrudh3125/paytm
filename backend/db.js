const mongoose=require("mongoose");

mongoose.connect("");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        minLength:3,
        maxLength:11
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
});

const bankSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    balance:{
        type:Number,
        required:true
    }
});

const User=mongoose.model("User",userSchema);
const Account=mongoose.model("Account",bankSchema);

module.exports={User,Account};

const express=require("express");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User, Account } = require("../db");

const router=express.Router();

const userSchema=zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

router.get("/bulk",async function(req,res){
    const filter=req.query.filter||"";
    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]        
    });

    res.json({
        users:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

router.post("/signup",async function(req,res){
    const input=req.body;

    const result=userSchema.safeParse(input);

    const user=await User.findOne({
        username:input.username
    });

    if(!user){
        if(result.success){
    
            const user=await User.create(input);

            await Account.create({
                userId:user._id,
                balance:1+Math.random()*100000
            })
    
            const token=jwt.sign({
                userId:user._id
            },JWT_SECRET);
    
            return res.status(200).json({
                message:"User created successfully",
                token:token
            });
        }
    }
    
    return res.status(411).send("email already taken/Invalid inputs");
})

router.post("/signin",async function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    const user=await User.findOne({
        username:username,
        password:password
    })

    if(user._id){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET);

        res.status(200).json({
            token:token
        });
    }
    else{
        res.status(411).send("User not found");
    }
})

module.exports=router;
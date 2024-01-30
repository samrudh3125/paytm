const express=require("express");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

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
            firstname:{
                "$regex":filter
            }
        },{
            lastname:{
                "$regex":filter
            }
        }]        
    });

    res.json({
        users:users.map(user=>({
            username:user.username,
            firstName:user.firstname,
            lastName:user.lastname,
            _id:user._id
        }))
    })
})

router.put("/",authMiddleware,async function(req,res){
    const input=req.body;

    const object=zod.object({
        password:zod.string().optional(),
        firstName:zod.string().optional(),
        lastName:zod.string().optional(),
    })

    const result=object.safeParse(input);

    if(!result.success){
        res.status(411).send("Error while updating");
    }

    const user=await User.updateOne(input,{
        id:req.userId
    });

    res.status(200).send("user updtated successfully");
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
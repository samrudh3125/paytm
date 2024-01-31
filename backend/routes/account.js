const express=require("express");
const { Account } = require("../db");
const zod=require("zod");
const { authMiddleware } = require("../middleware");
const mongoose=require("mongoose");

const router=express.Router();

router.get("/balance",authMiddleware,async function(req,res){
    const account=await Account.findOne({
        userId:req.userId
    });

    res.status(200).json({
        balance:account.balance
    })
});

router.post("/transfer",authMiddleware,async function(req,res){
    const session=await mongoose.startSession();

    session.startTransaction();

    const account=await Account.findOne({
        userId:req.userId
    }).session(session);

    const amount=req.body.amount;
    const to=req.body.id;

    if(!account||parseFloat(account.balance)<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        }); 
    }

    const toaccount=await Account.findOne({
        userId:to
    }).session(session);

    if(!toaccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message:"transaction successful"
    });
})



module.exports=router;
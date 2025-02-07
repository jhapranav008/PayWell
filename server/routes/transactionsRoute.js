const express = require("express")
const { authMiddleware } = require("../middleware/authMiddleware")
const Transactions = require("../models/transactionsModel")
const User = require("../models/userModel")


const router = express.Router()

//transfer money from one account to another

router.post("/transfer-funds", authMiddleware, async (req,res) => {
    try {
        //save the transaction
        const newTransaction = new Transactions(req.body)
        await newTransaction.save();

        //decrease the sender balance

        await User.findByIdAndUpdate(req.body.sender, {
            $inc: {balance: -req.body.amount}
        })

        //increase the receiver balance

        await User.findByIdAndUpdate(req.body.receiver, {
            $inc: {balance: req.body.amount}
        })

        res.send({
            message: "transaction Successfull",
            success: true,
            data: newTransaction
        })

    } catch (error) {
        res.send({
            message: "Transaction failed",
            success: false,
            data: error.message
        })
    }
})

//Verify the receiver

router.post("/verify-account", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById({_id: req.body.receiver})
        if(user){
            return (
                res.send({
                    message:"Account  Verified",
                    success: true,
                    data: user
                })
            )
        }else{
            res.send({
                message:"Account not found",
                success: false,
                data: error.message
            })
        }
    } catch (error) {
        res.send({
            message:"Account not found",
            success: false,
            data: error.message
        })
    }
})

router.post("/get-all-transactions-by-user", authMiddleware, async (req,res) => {
    try {
        const transactions = await Transactions.find({
            $or: [{sender: req.body.userId}, {receiver: req.body.userId}],
        }).sort({createdAt: -1}).populate("sender").populate("receiver");
        res.send({
            message:"Transactions fetched Successfully",
            data: transactions,
            success: true
        })
    } catch (error) {
        res.send({
            message:"Transactions not Fetched",
            data: error.message,
            success: false
        })
    }
})

module.exports = router
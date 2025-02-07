const express = require("express")
const Requests = require("../models/requestModel")
const User = require("../models/userModel")
const { authMiddleware } = require("../middleware/authMiddleware")
const router = express.Router()

//get all requests for a user

router.post("/get-all-requests-by-user", authMiddleware, async (req, res) => {

    try {
        const requests = await Requests.find({
            $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
        }).populate("sender").populate("receiver").sort({createdAt: -1})

        res.send({
            data: requests,
            message: "requests fetched successfully",
            success: true,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

//send request

router.post("/send-request", authMiddleware, async (req, res) => {
    try {
        const { receiver, amount, description } = req.body;
        const request = new Requests({
            sender: req.body.userId,
            receiver,
            amount,
            description,
        });

        await request.save();

        res.send({
            data: request,
            message: "Request Sent successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// update request status

router.post("/update-request-status", authMiddleware, async (req, res) => {
    try {
        if (req.body.status === "accepted") {

            //create a transaction

            //
            await User.findByIdAndUpdate(req.body.sender._id, {
                $inc: { balance: req.body.amount },
            });

            await User.findByIdAndUpdate(req.body.receiver._id, {
                $inc: { balance: -req.body.amount },
            })

        }
        await Requests.findByIdAndUpdate(req.body._id, {
            status: req.body.status,
        })
        res.send({
            data: null,
            message: "Request Status updated successfully",
            success: true
        })

    } catch (error) {
        res.send({
            data: error,
            message: error.message,
            success: false
        })
    }
})


module.exports = router

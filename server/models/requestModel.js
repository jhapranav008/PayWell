const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, {
    timestamps: true
}) 

const Requests = mongoose.model("Requests", requestSchema);

module.exports = Requests
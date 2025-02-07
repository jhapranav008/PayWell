const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,  
    },
    mobile:{
        type: String,
        required: true,  
    },
    verificationType:{
        type: String,
        required: true,
    },
    verificationNumber:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        default: 0
        
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema)

module.exports = User;
    
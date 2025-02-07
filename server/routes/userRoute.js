const express = require("express")
const  User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("../middleware/authMiddleware");


const router = express.Router()

router.post("/register", async (req,res) => {

    try {
        
        // Checking if user already exsists or not

        let user = await User.findOne({
            email: req.body.email
        });

         if(user){
          return  res.send({
                message:"User already exists",
                success: false
            })
        }

        //storing hashed password in DB

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save()
        // console.log("reached here3")
        res.send({
            message:"User created Successfully",
            data:null,
            success: true,
        })
    } catch (error) {
        res.send({
            message:error.message,
            success: false
        })
    }
})

router.post("/login", async (req,res) => {
    
    try {
        
        // console.log("reached router")
    //Check wheather the user exists or not

    const user = await User.findOne({
        email: req.body.email,
    })

    if(!user){
        return res.send({
            message:"User does not exists",
            success: false
        })
    }

    //Check if password is correct or not

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
        res.json({
            message:"Invalid Password",
          success: false
        })
    }

    //Creation of JWT token
    const JWT_SECRET = "pranav008";

    const token = await jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "1d"})

    res.send({
        message:"User Logged In Successfully",
        data: token,
        success: true,
    });
        
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }

})

router.post("/get-user-info", authMiddleware, async(req,res) => {
    try {
        
        const user = await User.findById(req.body.userId);
        const password = " ";
        res.send({
            data: user,
            success: true,
            message: "User Info Fetched Successfully"
        })
    } catch (error) {
        res.send({
            success:  false,
            message: error.message
        })
    }
})

module.exports = router;
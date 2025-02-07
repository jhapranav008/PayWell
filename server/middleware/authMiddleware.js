const jwt = require("jsonwebtoken")

function authMiddleware (req,res,next){

    const JWT_SECRET = "pranav008";
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.body.userId = decoded.userId;
        next()
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
}

module.exports = { authMiddleware };
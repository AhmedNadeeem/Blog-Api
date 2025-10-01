const { verifyToken } = require("../utils/jwt.utils")

const verifyTokenMiddleware = (req, res, next)=>{
    const token = req.headers.cookie?.split("=")[1];
    if(!token) return res.status(400).json({ message: "Token is required" });

    const userData = verifyToken(token);
    if(!userData) return res.status(400).json({ message: "Invalid token" });

    req.user = userData;
    next();
}

module.exports = {
    verifyTokenMiddleware
}
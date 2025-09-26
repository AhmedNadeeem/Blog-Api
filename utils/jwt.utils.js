const jwt = require("jsonwebtoken");

const genAccessToken = (payload)=>{
    const secret = process.env.JWT_SECRET
    return jwt.sign(payload, secret, { expiresIn: "1d" });

};

const verifyToken = (token)=>{
    const data = jwt.verify(token);
    if(data){
        return data
    } else {
        return false
    }

}

module.exports = {
    genAccessToken,
    verifyToken
}
const User = require("../models/user.model");
const { userRegisterValidation, userLoginValidation } = require("../utils/auth.joi");
const { passValidate } = require("../utils/bcrypt.utils");

const registerUser = async (req, res) => {
    try {
    const {error, value} = await userRegisterValidation(req.body);
    if(error) return res.status(401).json({ message: "User data isn't valid", details: error });
    console.log(value);

    const {username, email, password, bio, avatar} = value;

    const user = new User({
        username,
        email,
        password,
        bio,
        avatar
    });

    const newUser = await user.save();

    return res.status(201).json({ message: "User registered", user: newUser });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Failed to register user", details: error })
    }
};

const loginUser = async (req, res) => {
    try {
        const {error, value} = await userLoginValidation(req.body);
        if(error) return res.status(401).json({ message: "Email and password is required", details: error });

        const {email, password} = value;

        const userFind = await User.findOne({email});
        if(!userFind) return res.status(401).json({ message: "User doesn't exists" });

        const passCheck = passValidate(password, userFind.password);
        if(!passCheck) return res.status(401).json({ message: "Incorrect password" });

        return res.status(200).json({ message: "User logged in", user: userFind });
    } catch (error) {
        return res.status(500).json({ message: "Failed to login user", details: error })
    }
}

module.exports = {
    registerUser,
    loginUser
}
const bcrypt = require("bcrypt");

const hashPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
};

const passValidate = async (password, hashPass) => {
    return await bcrypt.compare(password, hashPass)
}

module.exports = {
    hashPass,
    passValidate
}
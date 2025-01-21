const secret = "anuj@321"

const jwt = require("jsonwebtoken");

function createtokenforuser(user){
    console.log(user)
    return jwt.sign({
        _id:user._id,
        email:user.email,
        profileimageurl:user.profileimageurl,
        role:user.role
    },secret)
}

function validatetoken(token){
    return jwt.verify(token,secret);
}

module.exports={
    createtokenforuser,
    validatetoken,
}
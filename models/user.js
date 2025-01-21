const mongoose = require('mongoose');
const { error } = require('node:console');
const { createHmac, randomBytes } = require('node:crypto');
const {createtokenforuser} = require('../service/auth')

const userschema = mongoose.Schema(
    {
        fullname: {
            type: "string",
            required: true,
        },
        email: {
            type: "string",
            required: true,
        },
        salt: {
            type: "string",
        },
        password: {
            type: "string",
            required: true,
        },
        profileimageurl: {
            type: "string",
            default: "/public/images/default-profile.jpg",
        },
        role: {
            type: "string",
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    { timestamps: true }
);

userschema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString('hex');

    const hashpassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    user.salt = salt;
    user.password = hashpassword;
    next();
});

userschema.static("matchpasswordandgeneratetoken", async function (email, password) {
    // Find user by email
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    // Hash the provided password with the user's salt
    const userProvidedPassword = createHmac("sha256", user.salt)
        .update(password)
        .digest("hex");

    // Compare the hashed passwords
    if (userProvidedPassword !== user.password) {
        throw new Error("Incorrect password");
    }
   
    const token = createtokenforuser(user)
    return token;

});


const User = mongoose.model('User', userschema);

module.exports = User;

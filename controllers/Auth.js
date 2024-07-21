const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const User = require("../models/User"); //db se interact kar paye using model

//signup route handler

exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        //check if user already exists
        const exisitngUser = await User.findOne({ email });
        //if user already exisits  just return the error of user already exists
        if (exisitngUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        //hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error hashing the password",
            });
        }

        //create entry fo rUser
        const user = await User.connect({
            name,
            email,
            password: hashedPassword,
            role,
        });
        return res.status(300).json({
            success: true,
            message: "User created",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User not registered , please try again later",
        });
    }
};

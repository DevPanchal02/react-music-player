const router = require("express").Router();
const users = require('../models/users');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const Token = require("../models/tokens");
const sendEmail = require('../utils/verificationEmail');
const crypto = require ('crypto');

router.get("/register", async (req, res) => {
    res.send ("Register Working");
})
//Input validation for each of the entires
router.post("/register",[check('email').notEmpty().isEmail().withMessage("Please Enter a valid Email").normalizeEmail(), 
check('password').notEmpty().withMessage("Please Enter a Password"), 
check('password').isStrongPassword().withMessage("Please Enter a Strong Password"),
check("firstName").notEmpty().withMessage("Please Enter your Name"),
check("lastName").notEmpty().withMessage("Please Enter your Name")], async (req, res) => {

//Saves errors and displays them
    const errors = validation = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()
        })
    }
//Verifies and Adds user to the database
    const User = await users.findOne({
            email: req.body.email
        });
        if(User) {
            return res.status(409).send({message: "Account With The Provided Email Already Exists"});
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPass = await bcrypt.hash(req.body.password, salt);

        try {
        const addUser = new users ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPass,
            role: "user",
            active: true,
            verified: false
        })
        const newUser = await addUser.save();

        const tokens = await new Token({
			accountID: newUser._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();

        const url = `${process.env.URL}${newUser.id}/verify/${tokens.token}`;
		await sendEmail(newUser.email, "Verify Email", url);

        res.status(201).json({message: "An email has been sent to your account"}); 
    }
    catch (error){
        res.status(400).json({message: error.message});
    }
    });

//Token router to check when the user has confirmed their email
    router.get("/:id/verify/:token/", async (req, res) => {
       
            const user = await users.findOne({_id: req.params.id});
            if (!user) return res.status(400).send("Invalid Link");

            const token = await Token.findOne({
                accountID: user._id,
                token: req.params.token,
            });

            if (!token){
                return res.status(400).send("Invalid Link");
            }

            await users.updateOne({_id: user._id}, {verified: true});
            await Token.remove();

            res.status(200).send("Email verified successfully");
        });

module.exports = router;
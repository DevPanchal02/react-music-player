const router = require ("express").Router();
const users = require("../models/users");
const bcrypt = require("bcrypt");
const {check, validationResult} = require('express-validator');
const Token = require ("../models/tokens");
const sendEmail = require("../utils/verificationEmail");
const crypto = require("crypto");

router.get  ("/login", async (req, res) => {
    res.send ("Login Working");
});

router.post("/login",[check('email').isEmail().normalizeEmail().withMessage("Please Enter a Valid Email"), check('email').notEmpty(), check('password').notEmpty().withMessage("Please enter a Valid Password")] ,async (req, res) => {
    
    const errors = validation = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()
        })
    }
    const user = await users.findOne({
        email: req.body.email
    });
    if (!user) {
        return res.status(401).send("Invalid Email or Password");
    }
    if (user.active == false) {
        return res.status(403).send("Account has been deactivated");
    }
    const validPassword = await bcrypt.compare (req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).send("Invalid Email or Password");
    };
    if(!user.verified){
        let token = await Token.findOne({accountID: user._id})
        if(!token) {
            token = await new Token({
                accountID: newUser._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
    
            const url = `${process.env.URL}users/${newUser.id}/verify/${tokens.token}`;
            await sendEmail(newUser.email, "Verify Email", url);

        }
        return res.status(400).send("An email has been send to your account")
    }

    const token = user.generateAuthKey();
    res.status(200).json({data: token, Name:user.firstName+" "+user.lastName, message: "Logged in Successfully"});
})


module.exports = router;
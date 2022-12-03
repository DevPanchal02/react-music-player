const router = require("express").Router();
const users = require('../models/users');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');


router.get("/register", async (req, res) => {
    res.send ("Register Working");
})

router.post("/register",[check('email').notEmpty().isEmail().withMessage("Please Enter a valid Email").normalizeEmail(), 
check('password').notEmpty().withMessage("Please Enter a Password"), 
check('password').isStrongPassword().withMessage("Please Enter a Strong Password"),
check("firstName").notEmpty().withMessage("Please Enter your Name"),
check("lastName").notEmpty().withMessage("Please Enter your Name")], async (req, res) => {


    const errors = validation = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()
        })
    }

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
            role: "test",
            active: true

        })
        const newUser = await addUser.save()
        res.status(201).json(newUser);
    }
    catch (error){
        res.status(400).json({message: error.message});
    }
    })

module.exports = router;
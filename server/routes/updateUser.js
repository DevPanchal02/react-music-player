const router = require("express").Router();
const {check, validationResult} = require('express-validator');
const users = require('../models/users');
const bcrypt = require ('bcrypt');

//gets all users
router.get('/accounts', async (req, res) => {
    try {
        const accounts = await users.find();
        res.json(accounts);
    }
    catch(error) {
        res.status(500).json({message: error.msg})
    }
})

//Gets user with the given email
router.get('/accounts/:email', async (req, res) => {
    try {

        const userEmail = {email: req.params.email.toLowerCase()};
        const result = await users.findOne(userEmail);
        if(result) {
        res.status(200).json(result);
        }
        else {
            res.status(404).json({message:"User not found"});
        }
    }
    catch(error) {
        res.status(500).json({message: error.msg})
    }
})

//Updates User account so the admin can activate/deactivate account
router.patch('/updateActive/:id', async (req, res) => {
   try {
    const userId = req.params.id;
    const update = {active: req.body.active};
    const result = await users.findByIdAndUpdate(userId, update);
    res.json(result);
    
   }
   catch (error) {
    res.status(400).json({message: error.msg});
   }

})
<<<<<<< HEAD

//Updates User account so the admin can give other users admin
router.patch('/updateAdmin/:id', async (req, res) => {
    try {
     const email = req.params.id;
     const result = await users.findOneAndUpdate({email: email}, {role: "admin"});
     if (result){
     res.json({message: "User Account Updated"});
     }
     else if (!result) {
        res.status(404).json({message: "User not found"});
     }
    }
    catch (error) {
     res.status(400).json({message: error.msg});
    }
 
 })

=======
//Helps update the user password
>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
router.patch('/updatePassword/:id',[
    check('newPassword').notEmpty().withMessage("Please Enter a Password"), 
    check('newPassword').isStrongPassword().withMessage("Please Enter a Strong Password")], async (req, res) => {

    const errors = validation = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({errors: errors.array()
        })
    }

    try {
     const userId = req.params.id;
     if (req.body.newPassword == req.body.confirmPassword) {
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const updatedHashPass = await bcrypt.hash(req.body.newPassword, salt);
        const newPassword = {password: updatedHashPass};
        const result = await users.findByIdAndUpdate(userId, newPassword);
        res.json(result);
     }
    else {
        res.status(401).send("Password does not match");
    }
}
    catch (error) {
     res.status(400).json({message: error.msg});
    }

 })
module.exports = router
const router = require("express").Router();
const {check, validationResult} = require('express-validator');
const users = require('../models/users');

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
//Gets user with the given id
router.get('/accounts/:id', async (req, res) => {
    try {

        const userId = req.params.id;
        const result = await users.findById(userId);
        res.status(200).json(result);
        
    }
    catch(error) {
        res.status(500).json({message: error.msg})
    }
})

//Updates User account so the admin can activate/deactivate account
router.patch('/accounts/:id', async (req, res) => {
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
module.exports = router
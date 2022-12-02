const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true,
    },
})

usersSchema.methods.generateAuthKey = function () {

    const token= jwt.sign ({_id:this._id}, process.env.JWT_PRIVATE_KEY);
    return token;
}

module.exports = mongoose.model ('users', usersSchema);


const mongoose = require('mongoose');


module.exports = () => {
    try {
        mongoose.connect(process.env.DB);
        console.log('Succesfully Connected to Database');
    }
    catch(error) {
        console.log(error);
        console.log('Failed to connect to Database');
    }
    
}
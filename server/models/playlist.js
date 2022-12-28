const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema ({
    
    playlistName: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
    },

    data: {
        type: Array,
        required: true,
    },
    review: {
        type: String,
    }
})

module.exports = mongoose.model ('playlist', playlistSchema);
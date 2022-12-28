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
<<<<<<< HEAD
    },
    review: {
        type: String,
    }
=======
    }

>>>>>>> d0696699fd317e1bedfb8693709bf4c3051808ed
})

module.exports = mongoose.model ('playlist', playlistSchema);
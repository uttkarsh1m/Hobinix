const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    thumbUrl: String,
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'song',
        },
    ],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
    saves: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
    created: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = new mongoose.model('album', albumSchema);

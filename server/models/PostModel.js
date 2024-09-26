const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post: {
        type: String,
        required: [true, 'Post name must be required'],
    },
    url: String,
    thumbnail: String,
    thumbUrl: String,
    category: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    caption: String,
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
    posted: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = new mongoose.model('post', postSchema);

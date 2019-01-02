const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModel = new Schema({
    start: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model('CommentModel', CommentModel);
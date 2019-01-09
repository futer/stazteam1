const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModel = require('./comment.model');

const DocumentModel = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: String,
        default: new Date().getDate().toString(),
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: [
            'ACCEPTED',
            'PENDING',
            'REJECTED',
        ],
        required: true,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    //comments: [CommentModel],
});

module.exports = mongoose.model('DocumentModel', DocumentModel);
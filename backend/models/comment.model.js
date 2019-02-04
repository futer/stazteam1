const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const CommentModel = new Schema({
    start: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    page: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    reviewer: {
        type: ObjectId,
        ref: 'UserModel',
    }
});

module.exports = mongoose.model('CommentModel', CommentModel);
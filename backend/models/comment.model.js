const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MarkedTextModel = require('../models/marked-text.model');

const CommentModel = new Schema({
    page: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    markedText: [MarkedTextModel.schema],
    reviewer: {
        type: ObjectId,
        ref: 'UserModel',
    }
});

module.exports = mongoose.model('CommentModel', CommentModel);
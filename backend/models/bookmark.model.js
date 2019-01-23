const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarkModel = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        enum: [
            'TOP',
            'RIGHT',
        ],
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model('BookmarkModel', BookmarkModel);
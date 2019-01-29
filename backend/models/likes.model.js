const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikesModel = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    docsId: [String]
});

module.exports = mongoose.model('LikesModel', LikesModel);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LikesModel = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    docs: [{
        type: ObjectId,
        ref: 'DocumentModel'
    }]
});

module.exports = mongoose.model('LikesModel', LikesModel);
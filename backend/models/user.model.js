const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    registered: {
        type: String,
        enum: [
            'LOCAL',
            'FACEBOOK',
            'GOOGLE',
            'LOCAL_FACEBOOK',
            'LOCAL_GOOGLE',
        ],
        required: true,
    },
    pic: {
        type: String,
        required: false,
        trim: true,
    },
    isBanned: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('UserModel', UserModel);
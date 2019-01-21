const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const CommentModel = require('./comment.model');

const DocumentModel = new Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  preview: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['ACCEPTED', 'PENDING', 'REJECTED'],
    default: 'PENDING'
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
    trim: true
  },
  //comments: [CommentModel],
});

module.exports = mongoose.model('DocumentModel', DocumentModel);

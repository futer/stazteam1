const database = require('../helpers/database');
const Document = require('../models/document.model');

async function addComment(data) {
  database.connect();

  const document = await Document
    .findOneAndUpdate(
      { _id: data.documentId }, 
      { 
        $push: {
          comments: data
        }
      },
      { new: true }
    )
    .populate('comments.reviewer');
  
  return document.comments.pop();
}

async function updateComment(id, data) {
  database.connect();

  const document = await Document
    .findOne({'comments._id': id })
    .populate('comments.reviewer');

  if (!document) { return null; }

  const comment = document.comments.id(id);

  Object.assign(comment, data);

  await document.save();

  return comment;
}

async function deleteComment(id) {
  database.connect();
  
  const document = await Document
    .findOne({'comments._id': id })
    .populate('comments.reviewer');

  if (!document) { return null; }

  const idx = document
    .comments
    .findIndex(com => com._id.toString() === id);

  if (idx >= 0) {
    const comment = document.comments[idx];
    document.comments.splice(idx, 1);
    document.save();
    return comment;
  } 

  return null;
}

async function getComments(data) {
  database.connect();

  let comments = await Document
    .aggregate([
      { $match: data },
      { $unwind: '$comments' },
      {
        $lookup: {
          from: 'usermodels',
          localField: 'comments.reviewer',
          foreignField: '_id',
          as: 'reviewerData',
        }
      },
      { $unwind: '$reviewerData' },
      { 
        $project: {
          _id: '$comments._id',
          page: '$comments.page',
          content: '$comments.content',
          markedText: '$comments.markedText',
          reviewer: '$reviewerData'
        }
      },
    ]);

  return comments;
}

async function getComment(id) {
  database.connect();

  const document = await Document
    .findOne({ 'comments._id': id })
    .populate('comments.reviewer');

  if (!document) { return null; }

  return document.comments.id(id);
}

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  getComments,
  getComment,
}

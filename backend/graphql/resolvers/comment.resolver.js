const commentService = require('../../services/comment.service');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

function addComment(root, args, context) {
  args.input.reviewer = context.user.sub._id;
  return commentService.addComment(args.input);
}

function updateComment(root, args, context) {
  const id = args.input.id;
  delete args.input.id;

  return commentService.updateComment(id, args.input);
}

function deleteComment(root, args, context) {
  return commentService.deleteComment(args.id);
}

function getComments(root, args, context) {
  let data = args;
  if (Object.keys(args).length !== 0) {
    data = { _id: ObjectId(args.documentId) }
  }

  return commentService.getComments(data);
}

function getComment(root, args, context) {
  return commentService.getComment(args.id);
}

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  getComments,
  getComment,
}

const commentService = require('../../services/comment.service');

function addComment(root, args, context) {
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
  return commentService.getComments();
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

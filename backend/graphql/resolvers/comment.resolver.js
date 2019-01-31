const commentService = require('../../services/comment.service');

function addComment(root, args, context) {
  const comment = commentService.addComment(args);

  return comment;
}

function updateComment(root, args, context) {
  const id = args.id;
  delete args.id;
  const comment = commentService.updateComment(id, args);

  return comment;
}

function deleteComment(root, args, context) {
  const comment = commentService.deleteComment(args.id);

  return comment;
}

function getComments(root, args, context) {
  const comments = commentService.getComments();

  return comments;
}

function getComment(root, args, context) {
  const comment = commentService.getComment(args.id);

  return comment;
}

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  getComments,
  getComment,
}

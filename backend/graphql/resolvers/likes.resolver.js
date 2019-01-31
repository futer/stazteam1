const likesService = require('../../services/likes.service');

function getLikes(root, args, context) {

  return likesService.getLikes(context.user.sub._id);
}

function checkLike(root, args, context) {

  return likesService.checkLike(args.docs,context.user.sub._id);
}

function addLike(root, args, context) {
  const likes = likesService.addLike(args.docs,context.user.sub._id);

  return likes;
}

function deleteLike(root, args, context) {
  const likes = likesService.deleteLike(args.docs,context.user.sub._id);

  return likes;
}

module.exports = {
  getLikes,
  checkLike,
  addLike,
  deleteLike
};

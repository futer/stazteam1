const likesService = require('../../services/likes.service');

function getLikes(root, args, context) {
  return likesService.getLikes(args);
}

function addLike(root, args, context) {
  const likes = likesService.addLike(args);

  return likes;
}

function deleteLike(root, args, context) {
  const likes = likesService.deleteLike(args);

  return likes;
}

module.exports = {
  getLikes,
  addLike,
  deleteLike
};

const bookmarkService = require("../../services/bookmark.service");


function addBookmark(root, args, context) {
  const bookmark = bookmarkService.addBookmark(args);

  return bookmark;
};

function updateBookmark(root, args, context) {
  const bookmark = bookmarkService.updateBookmark(args);

  return bookmark;
}

function deleteBookmark(root, args, context) {
  const bookmark = bookmarkService.deleteBookmark(args.id);

  return bookmark;
}

module.exports = {
  addBookmark,
  updateBookmark,
  deleteBookmark,
}
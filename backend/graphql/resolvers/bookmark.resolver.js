const bookmarkService = require("../../services/bookmark.service");

function getBookmarks(root, args, context) {
  return bookmarkService.getBookmarks();
}

function getBookmark(root, args, context) { 
  bookmark = bookmarkService.getBookmark(args);

  return bookmark;
}

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
  getBookmarks,
  addBookmark,
  updateBookmark,
  deleteBookmark,
  getBookmark
}
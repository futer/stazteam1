const bookmarkService = require('../../services/bookmark.service');

function getBookmarks(root, args, context) {
  return bookmarkService.getBookmarks();
}

module.exports = {
  getBookmarks,
};

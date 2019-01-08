const bookmarkService = require('../../services/bookmark.service');
const documentService = require('../../services/document.service');

function getBookmarks(root, args, context) {
  return bookmarkService.getBookmarks();
}

function getDocuments(root, args, context) {
  return documentService.getDocuments();
}

module.exports = {
  getBookmarks,
  getDocuments,
};

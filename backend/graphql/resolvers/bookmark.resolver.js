const bookmarkService = require("../../services/bookmark.service");
const userService = require("../../services/user.service");
const jwt = require('jsonwebtoken');

function getBookmarks(root, args, context) {
  return bookmarkService.getBookmarks();
}

function getBookmark(root, args, context) { 
  bookmark = bookmarkService.getBookmark(args);

  return bookmark;
}

async function addBookmark(root, args, context) {
  let bookmark;
  let token = context.headers.authorization.slice(7);

  await userService.isAdmin(token)
  .then(() => {
   bookmark = bookmarkService.addBookmark(args);
  }).catch(error => {throw error});
  
  return bookmark;
   
};

async function updateBookmark(root, args, context) {
  let bookmark;
  let token = context.headers.authorization.slice(7);

  await userService.isAdmin(token)
    .then(() => {
      bookmark = bookmarkService.updateBookmark(args);
    }).catch(err => {throw err});
   
  return bookmark;
}

async function deleteBookmark(root, args, context) {
  let bookmark;
  let token = context.headers.authorization.slice(7);

  await userService.isAdmin(token)
    .then(() => {
      bookmark = bookmarkService.deleteBookmark(args.id);
    }).catch(err => {throw error});

  return bookmark;
}

module.exports = {
  getBookmarks,
  addBookmark,
  updateBookmark,
  deleteBookmark,
  getBookmark
}
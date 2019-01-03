const database = require('../helpers/database');

const Bookmark = require('../models/bookmark.model');

async function getBookmarks() {
  database.connect();
  const bookmarks = await Bookmark.find();
  database.disconnect();

  return bookmarks; 
};

module.exports = {
  getBookmarks,
};

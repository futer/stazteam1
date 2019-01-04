const database = require('../helpers/database');

const Bookmark = require('../models/bookmark.model');

async function getBookmarks() {
  database.connect();
  const bookmarks = await Bookmark.find();
  database.disconnect();

  return bookmarks;
}

async function addBookmark(data) {
  database.connect();
  const bookmark = new Bookmark(data);
  await bookmark.save();
  database.disconnect();

  return bookmark;
}

async function updateBookmark(data) {
  database.connect();
  const bookmark = await Bookmark.findOneAndUpdate({ _id: data.id }, data, { new: true });
  database.disconnect();

  return bookmark;
}

async function deleteBookmark(id) {
  database.connect();
  const bookmark = await Bookmark.findOneAndDelete({_id: id});
  database.disconnect();

  return bookmark;
}

module.exports = {
  getBookmarks,
  addBookmark,
  updateBookmark,
  deleteBookmark,
};

const database = require('../helpers/database');

const Bookmark = require('../models/bookmark.model');

async function getBookmarks() {
  database.connect();
  const bookmarks = await Bookmark.find();

  return bookmarks;
}

async function addBookmark(data) {
  database.connect();
  const bookmark = new Bookmark(data);
  await bookmark.save();

  return bookmark;
}

async function updateBookmark(data) {
  database.connect();
  const bookmark = await Bookmark.findOneAndUpdate({ _id: data.id }, data, { new: true });

  return bookmark;
}

async function deleteBookmark(id) {
  database.connect();
  const bookmark = await Bookmark.findOneAndDelete({_id: id});

  return bookmark;
}

module.exports = {
  getBookmarks,
  addBookmark,
  updateBookmark,
  deleteBookmark,
};

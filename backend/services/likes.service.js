const database = require('../helpers/database');

const Likes = require('../models/likes.model');

async function getLikes(data) {
  database.connect();

  const likes = await Likes.findOne({ userId: data.userId });

  return likes;
}

async function addLike(data) {
  database.connect();

  let likes = await Likes.findOneAndUpdate(
    { userId: data.userId },
    { $push: { docsId: data.docsId } },
    { new: true }
  );

  if (!likes) {
    likes = new Likes({
      userId: data.userId,
      docsId: data.docsId
    });
  }

  await likes.save();
  return likes;
}

async function deleteLike(data) {
  database.connect();

  let likes = await Likes.findOneAndUpdate(
    { userId: data.userId },
    { $pullAll: { docsId: data.docsId } },
    { new: true }
  );

  await likes.save();
  return likes;
}

module.exports = {
  getLikes,
  addLike,
  deleteLike
};

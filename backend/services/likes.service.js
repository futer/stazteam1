const database = require('../helpers/database');

const Likes = require('../models/likes.model');

async function getLikes(userId) {
  database.connect();
  
  const likes = await Likes.findOne({ userId: userId }).populate('docs');
  console.log(likes);
  return likes;
}

async function addLike(docId,userId) {
  database.connect();

  let likes = await Likes.findOneAndUpdate(
    { userId: userId },
    { $push: { docs: docId } },
    { new: true }
  );

  if (!likes) {
    likes = new Likes({
      userId: data.userId,
      docsId: data.docs
    });
  }

  await likes.save();
  return likes;
}

async function deleteLike(docId,userId) {
  database.connect();

  let likes = await Likes.findOneAndUpdate(
    { userId: userId },
    { $pull: { docs: docId } },
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

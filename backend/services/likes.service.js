const database = require('../helpers/database');

const Likes = require('../models/likes.model');

async function getLikes(data,userId) {
  database.connect();
  
  const likes = await Likes.findOne({ userId: userId })
  .populate('docs')
  .limit(10)
  .skip(data.page*10);

  return likes;
}

async function checkLike(docId,userId) {
  database.connect();
  
  const likes = await Likes.findOne({ userId: userId, docs: docId });
  if (!likes) {
    return false;
  }
  return true;
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
      userId: userId,
      docs: docId
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
  checkLike,
  addLike,
  deleteLike
};

const database = require('../helpers/database');

const Likes = require('../models/likes.model');

async function getLikes(userId) {
  database.connect();
  console.log(userId);
  const likes = await Likes.findById({ _id: userId.id });

  return likes;
}

async function addLike(data) {
  database.connect();
  const likes = await Likes.findOne({ userId: data.userId.id }, function(err, docs) {
    if (docs) {
      docs.docsId.push('156654615616546456465');
      return docs;
    } else{
      //here add new
    }
  });
  likes.then(x=>console.log(x));
  await likes.save();

  return likes;
}

async function deleteLike(data) {
  database.connect();
  const likes = await Likes.findOneAndDelete({ _id: id });

  return likes;
}

module.exports = {
  getLikes,
  addLike,
  deleteLike
};

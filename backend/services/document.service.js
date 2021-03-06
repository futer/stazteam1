const database = require('../helpers/database');
const Document = require('../models/document.model');

async function getDocuments(page, data) {
  database.connect();

  return await Document.find(data)
    .populate('comments.reviewer')
    .sort({'date': -1})
    .limit(10)
    .skip(page*10);
}

async function getDocument(data) {
  database.connect();
  const document = await Document.findById({ _id: data.id }).populate('comments.reviewer');

  return document;
}

async function addDocument(data) {
  database.connect();
  const document = new Document(data);
  await document.save();

  return document;
}

async function updateDocument(data) {
  database.connect();
  const document = await Document.findOneAndUpdate({ _id: data.id }, data, { new: true });

  return document;
}

async function deleteDocument(id) {
  database.connect();
  const document = await Document.findOneAndDelete({_id: id});

  return document;
}

module.exports = {
  getDocuments,
  getDocument,
  addDocument,
  updateDocument,
  //deleteDocument,
};

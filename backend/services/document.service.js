const database = require('../helpers/database');

const Document = require('../models/document.model');

async function getDocuments() {
  database.connect();
  const documents = await Document.find();
  database.disconnect();

  return documents;
}

async function addDocument(data) {
  database.connect();
  const document = new Document(data);
  await document.save();
  database.disconnect();

  return document;
}

async function updateDocument(data) {
  database.connect();
  const document = await document.findOneAndUpdate({ _id: data.id }, data, { new: true });
  database.disconnect();

  return document;
}

async function deleteDocument(id) {
  database.connect();
  const document = await Document.findOneAndDelete({_id: id});
  database.disconnect();

  return document;
}

module.exports = {
  getDocuments,
  addDocument,
  updateDocument,
  //deleteDocument,
};

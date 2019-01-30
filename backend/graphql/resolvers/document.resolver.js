const documentService = require('../../services/document.service');

function getDocuments(root, args, context) {
  return documentService.getDocuments();
}

function getCertainDocuments(root, args, context) {
  return documentService.getCertainDocuments(args);
}

function getDocument(root, args, context) {
  return documentService.getDocument(args);
}

function addDocument(root, args, context) {
  const document = documentService.addDocument(args);
  return document;
}

function updateDocument(root, args, context) {
  const document = documentService.updateDocument(args);

  return document;
}

function deleteDocument(root, args, context) {
  const document = documentService.deleteDocument(args.id);

  return document;
}

module.exports = {
  getDocuments,
  getCertainDocuments,
  getDocument,
  addDocument,
  updateDocument
  //deleteBookmark,
};

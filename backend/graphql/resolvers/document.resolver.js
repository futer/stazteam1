const documentService = require('../../services/document.service');

function getDocuments(root, args, context) {
  return documentService.getDocuments();
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
  addDocument,
  updateDocument
  //deleteBookmark,
};

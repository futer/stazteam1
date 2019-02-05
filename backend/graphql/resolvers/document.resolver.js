const documentService = require('../../services/document.service');

function getDocuments(root, args, context) {
  return documentService.getDocuments();
}

function getDocumentsByStatus(root, args, context) {
  return documentService.getDocumentsByStatus(args);
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
  getDocumentsByStatus,
  getDocument,
  addDocument,
  updateDocument,
  //deleteBookmark,
};

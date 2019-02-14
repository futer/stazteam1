const documentService = require('../../services/document.service');
const userService = require("../../services/user.service");

function getDocuments(root, args, context) {
  return documentService.getDocuments(args);
}

function getDocument(root, args, context) {
  return documentService.getDocument(args);
}

async function addDocument(root, args, context) {
  let document;
  let token = context.headers.authorization.slice(7);

  await userService.isEditor(token)
    .then(() => {
      document = documentService.addDocument(args);
    }).catch(err => {throw err});
  
  return document;
}

function updateDocument(root, args, context) {
  let document;
  const document = documentService.updateDocument(args);

  return document;
}

function deleteDocument(root, args, context) {
  const document = documentService.deleteDocument(args.id);

  return document;
}

module.exports = {
  getDocuments,
  getDocument,
  addDocument,
  updateDocument
  //deleteBookmark,
};

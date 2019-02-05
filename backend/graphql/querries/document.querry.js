const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,GraphQLInt
} = require('graphql');

const { documentType, getStatusEnum } = require('../types/document.type');

const documentResolver = require('../resolvers/document.resolver');

const documentQueries = {
  documents: {
    type: new GraphQLList(documentType),
    resolve: documentResolver.getDocuments,
    args: {
      page: {
        type: GraphQLInt
      }
    }
  },
  document: {
    type: documentType,
    resolve: documentResolver.getDocument,
    args: {
      id: {
        type: GraphQLString
      }
    }
  }
};

const documentMutations = {
  addDocument: {
    type: documentType,
    args: {
      author: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) },
      preview: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: documentResolver.addDocument
  },
  updateDocument: {
    type: documentType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      author: { type: GraphQLString },
      content: { type: new GraphQLNonNull(GraphQLString) },
      date: { type: new GraphQLNonNull(GraphQLString) },
      preview: { type: GraphQLString },
      status: {
        type: getStatusEnum('statusUpdateInput')
      },
      title: { type: GraphQLString }
    },
    resolve: documentResolver.updateDocument
  },
  // deleteDocument: {
  //   type: documentType,
  //   args: {
  //     id: { type: new GraphQLNonNull(GraphQLString) }
  //   },
  //   resolve: documentResolver.deleteDocument
  // }
};

module.exports = {
  documentQueries,
  documentMutations
};

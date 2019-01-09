const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const { documentType, getStatusEnum } = require('../types/document.type');

const documentResolver = require('../resolvers/document.resolver');

const documentQueries = {
  documents: {
    type: new GraphQLList(documentType),
    resolve: documentResolver.getDocuments
  }
};

const documentMutations = {
  addDocument: {
    type: documentType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      date: { type: new GraphQLNonNull(GraphQLString) },
      status: {
        type: new GraphQLNonNull(getStatusEnum('statusAddType'))
      },
      content: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLString) },
      author: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: documentResolver.addDocument
  },
  updateDocument: {
    type: documentType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
      date: { type: GraphQLString },
      status: {
        type: getStatusEnum('statusUpdateInput')
      },
      content: { type: GraphQLString },
      userId: { type: GraphQLString },
      author: { type: GraphQLString }
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

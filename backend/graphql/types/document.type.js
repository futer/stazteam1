const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType
} = require('graphql');

const documentResolver = require('../resolvers/document.resolver');

const documentType = new GraphQLObjectType({
  name: 'documentType',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    status: {
      type: new GraphQLNonNull(getStatusEnum('statusType'))
    },
    content: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const documentMutation = new GraphQLObjectType({
  name: 'documentMutation',
  fields: () => ({
    addDocument: {
      type: documentType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLNonNull(getStatusEnum('statusType'))
        },
        content: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: documentResolver.addBookmark
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
      resolve: documentResolver.updateBookmark
    },
    deleteDocument: {
      type: documentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: documentResolver.deleteBookmark
    }
  })
});

function getStatusEnum(name) {
  const statusEnum = new GraphQLEnumType({
    name: name,
    values: {
      PENDING: { value: 'PENDING' },
      ACCEPTED: { value: 'ACCEPTED' },
      REJECTED: { value: 'REJECTED' }
    }
  });

  return statusEnum;
}

module.exports = {
  documentType,
  documentMutation
};

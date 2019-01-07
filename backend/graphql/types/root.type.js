const { GraphQLObjectType, GraphQLList } = require('graphql');

const { bookmarkType } = require('./bookmark.type');

const rootResolver = require('../resolvers/root.resolver');

const rootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    bookmark: {
      type: GraphQLList(bookmarkType),
      resolve: rootResolver.getBookmarks,
    }
  })
});

module.exports = rootType;

const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { bookmarkQueries, bookmarkMutations } = require('./querries/bookmark.querry');
const { documentQueries, documentMutations } = require('./querries/document.querry');
const { userQueries, userMutations } = require('./querries/user.querry');
const { likesQueries, likesMutations } = require('./querries/likes.querry')

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        ...bookmarkQueries,
        ...documentQueries,
        ...userQueries,
        ...likesQueries
      }),
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        ...bookmarkMutations,
        ...documentMutations,
        ...userMutations,
        ...likesMutations
      }),
    }),
  });

  module.exports = schema;
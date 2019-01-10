const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { bookmarkQueries, bookmarkMutations } = require('./querries/bookmark.querry');
const { documentQueries, documentMutations } = require('./querries/document.querry');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        ...bookmarkQueries,
        ...documentQueries
      }),
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        ...bookmarkMutations,
        ...documentMutations
      }),
    }),
  });

  module.exports = schema;
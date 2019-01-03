const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const BookmarkType = new GraphQLObjectType({
  name: 'Bookmark',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    position: { type: new GraphQLNonNull(GraphQLString) },
    link: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = BookmarkType;
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

const bookmarkResolver = require('../resolvers/bookmark.resolver');

const bookmarkType = new GraphQLObjectType({
  name: 'bookmarkType',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    position: {
      type: new GraphQLNonNull(
        getPositionEnum('positionType'),
      )
    },
    link: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const bookmarkMutation = new GraphQLObjectType({
  name: 'bookmarkMutation',
  fields: () => ({
    addBookmark: {
      type: bookmarkType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        position: {
          type: new GraphQLNonNull(
            getPositionEnum('positionAddInput'),
          )
        },
        link: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: bookmarkResolver.addBookmark,
    },
    updateBookmark: {
      type: bookmarkType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        position: {
          type: getPositionEnum('positionUpdateInput'),
        },
        link: { type: GraphQLString },
      },
      resolve: bookmarkResolver.updateBookmark,
    },
    deleteBookmark: {
      type: bookmarkType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: bookmarkResolver.deleteBookmark,
    },
  })
});

function getPositionEnum(name) {
  const positionEnum = new GraphQLEnumType({
    name: name,
    values: {
      TOP: { value: 'TOP' },
      RIGHT: { value: 'RIGHT' },
    },
  });

  return positionEnum;
}

module.exports = {
  bookmarkType,
  bookmarkMutation,
};

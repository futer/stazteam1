const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const { bookmarkType, getPositionEnum } = require('../types/bookmark.type');

const bookmarkResolver = require('../resolvers/bookmark.resolver');

const bookmarkQueries = {
  bookmarks: {
    type: new GraphQLList(bookmarkType),
    resolve: bookmarkResolver.getBookmarks
  },
  bookmark: {
    type: bookmarkType,
    resolve: bookmarkResolver.getBookmark,
    args: {
      id: {
        type: GraphQLString
      }
    }
  }
};

const bookmarkMutations = {
  addBookmark: {
    type: bookmarkType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      position: {
        type: new GraphQLNonNull(getPositionEnum('positionAddInput'))
      },
      content: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: bookmarkResolver.addBookmark
  },
  updateBookmark: {
    type: bookmarkType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
      position: {
        type: getPositionEnum('positionUpdateInput')
      },
      content: { type: GraphQLString }
    },
    resolve: bookmarkResolver.updateBookmark
  },
  deleteBookmark: {
    type: bookmarkType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: bookmarkResolver.deleteBookmark
  }
};

module.exports = {
  bookmarkQueries,
  bookmarkMutations
};

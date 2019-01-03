const { GraphQLObjectType, GraphQLList } = require('graphql');

const BookmarkType = require('./bookmark.type');

const bookmarkService = require('../../services/bookmark.service');

const RootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    bookmark: {
      type: GraphQLList(BookmarkType),
      resolve(root, args, context) {
        return bookmarkService.getBookmarks();
      }
    }
  })
});

module.exports = RootType;

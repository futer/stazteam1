const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const { likesType } = require('../types/likes.type');

const likesResolver = require('../resolvers/likes.resolver');

const likesQueries = {
  likes: {
    type: likesType,
    resolve: likesResolver.getLikes,
    args: {
      userId: {
        type: GraphQLString
      }
    }
  }
};

const likesMutations = {
  addLike: {
    type: likesType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLString) },
      docsId: { type: GraphQLList(GraphQLString) }
    },
    resolve: likesResolver.addLike
  },
  deleteLike: {
    type: likesType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLString) },
      docsId: { type: GraphQLList(GraphQLString) }
    },
    resolve: likesResolver.deleteLike
  }
};

module.exports = {
  likesQueries,
  likesMutations
};

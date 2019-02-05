const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} = require('graphql');

const { likesType } = require('../types/likes.type');

const likesResolver = require('../resolvers/likes.resolver');

const likesQueries = {
  likes: {
    type: likesType,
    resolve: likesResolver.getLikes,
    args: {
      page: {
        type: GraphQLInt
      }
    }
  },
  like: {
    type: GraphQLBoolean,
    resolve: likesResolver.checkLike,
    args: {
      docs: { type: new GraphQLNonNull(GraphQLString) }
    }
  }
};

const likesMutations = {
  addLike: {
    type: likesType,
    args: {
      docs: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: likesResolver.addLike
  },
  deleteLike: {
    type: likesType,
    args: {
      docs: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: likesResolver.deleteLike
  }
};

module.exports = {
  likesQueries,
  likesMutations
};

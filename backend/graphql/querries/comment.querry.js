const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
  } = require('graphql');

const { commentType } = require('../types/comment.type');
const commentResolver = require('../resolvers/comment.resolver');

const commentQueries = {
  comments: {
    type: new GraphQLList(commentType),
    resolve: commentResolver.getComments,
  },
  comment: {
    type: commentType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      }
    },
    resolve: commentResolver.getComment,
  }
}

const commentMutations = {
  addComment: {
    type: commentType,
    args: {
      documentId: {type: new GraphQLNonNull(GraphQLString) },
      start: { type: new GraphQLNonNull(GraphQLInt) },
      length: { type: new GraphQLNonNull(GraphQLInt) },
      page: { type: new GraphQLNonNull(GraphQLInt) },
      content: { type: new GraphQLNonNull(GraphQLString) },
      reviewer: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: commentResolver.addComment,
  },
  updateComment: {
    type: commentType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      start: { type: GraphQLInt },
      length: { type: GraphQLInt },
      page: { type: GraphQLInt },
      content: { type: GraphQLString },
    },
    resolve: commentResolver.updateComment,
  },
  deleteComment: {
    type: commentType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: commentResolver.deleteComment,
  }
}

module.exports = {
  commentQueries,
  commentMutations,
}

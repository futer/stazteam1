const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
  } = require('graphql');

const { 
  commentType, 
  addCommentInput, 
  updateCommentInput 
} = require('../types/comment.type');
const commentResolver = require('../resolvers/comment.resolver');

const commentQueries = {
  comments: {
    type: new GraphQLList(commentType),
    args: {
      documentId: { 
        type: GraphQLString 
      },
    },
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
      input: { 
        type: new GraphQLNonNull(addCommentInput) 
      },
    },
    resolve: commentResolver.addComment,
  },
  updateComment: {
    type: commentType,
    args: {
      input: { 
        type: new GraphQLNonNull(updateCommentInput) 
      },
    },
    resolve: commentResolver.updateComment,
  },
  deleteComment: {
    type: commentType,
    args: {
      id: { 
        type: new GraphQLNonNull(GraphQLString) 
      },
    },
    resolve: commentResolver.deleteComment,
  }
}

module.exports = {
  commentQueries,
  commentMutations,
}

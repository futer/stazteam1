const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require('graphql');

const { userType } = require('../types/user.type');

const commentType = new GraphQLObjectType({
  name: 'commentType',
  fields: () => ({
    id: { 
      type: new GraphQLNonNull(GraphQLID),
      resolve: data => data._id.toString()
    },
    start: { type: new GraphQLNonNull(GraphQLInt) },
    length: { type: new GraphQLNonNull(GraphQLInt) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    reviewer: { type: new GraphQLNonNull(userType) },
  })
});

const addCommentInput = new GraphQLInputObjectType({
  name: 'addCommentInput',
  fields: () => ({
    documentId: {type: new GraphQLNonNull(GraphQLString) },
    start: { type: new GraphQLNonNull(GraphQLInt) },
    length: { type: new GraphQLNonNull(GraphQLInt) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    reviewer: { type: new GraphQLNonNull(GraphQLString) },
  })
})

const updateCommentInput = new GraphQLInputObjectType({
  name: 'updateCommentInput',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    start: { type: GraphQLInt },
    length: { type: GraphQLInt },
    page: { type: GraphQLInt },
    content: { type: GraphQLString },
  })
})

module.exports = {
  commentType,
  addCommentInput,
  updateCommentInput,
}

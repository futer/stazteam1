const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
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

module.exports = {
  commentType,
}

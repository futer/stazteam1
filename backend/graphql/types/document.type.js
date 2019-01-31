const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList,
} = require('graphql');

const { commentType } = require('../types/comment.type');
const commentResolver = require('../resolvers/comment.resolver');

const documentType = new GraphQLObjectType({
  name: 'documentType',
  fields: () => ({
    id: { 
      type: new GraphQLNonNull(GraphQLString),
      resolve: data => data._id.toString()
    },
    author: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    preview: { type: new GraphQLNonNull(GraphQLString) },
    status: {
      type: new GraphQLNonNull(getStatusEnum('statusType'))
    },
    title: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    comments: { type: new GraphQLNonNull(
      new GraphQLList(commentType)
    )},
  })
});

function getStatusEnum(name) {
  const statusEnum = new GraphQLEnumType({
    name: name,
    values: {
      PENDING: { value: 'PENDING' },
      ACCEPTED: { value: 'ACCEPTED' },
      REJECTED: { value: 'REJECTED' }
    }
  });

  return statusEnum;
};

module.exports = {
  documentType,
  getStatusEnum
};

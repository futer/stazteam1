const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLEnumType,
  } = require('graphql');
  
  const documentResolver = require('../resolvers/document.resolver');

  const documentType = new GraphQLObjectType({
    name: 'documentType',
    fields: () => ({
      title: { type: new GraphQLNonNull(GraphQLString) },
      date: { type: new GraphQLNonNull(GraphQLString) },
      status: {
        type: new GraphQLNonNull(
            getStatusEnum('statusType'),
        )
      },
      content: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLString) },
      author: { type: new GraphQLNonNull(GraphQLString) },
    })
  });

  function getStatusEnum(name) {
    const statusEnum = new GraphQLEnumType({
      name: name,
      values: {
        PENDING: { value: 'PENDING' },
        ACCEPTED: { value: 'ACCEPTED' },
        REJECTED: { value: 'REJECTED' },
      },
    });
  
    return statusEnum;
  }

  module.exports = {
    documentType,
    //documentMutation,
  };
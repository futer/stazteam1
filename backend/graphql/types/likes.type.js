const {
    GraphQLObjectType,
    GraphQLList,
  } = require('graphql');

  const { documentType } = require('./document.type');
  
  const likesType = new GraphQLObjectType({
    name: 'likesType',
    fields: () => ({
      docs: { type: GraphQLList(documentType) }
    })
  });
  
  module.exports = {
    likesType
  };
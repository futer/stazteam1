const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
  } = require('graphql');
  
  const likesType = new GraphQLObjectType({
    name: 'likesType',
    fields: () => ({
      userId: { type: new GraphQLNonNull(GraphQLString) },
      docsId: { type: GraphQLList(GraphQLString) }
    })
  });
  
  module.exports = {
    likesType
  };
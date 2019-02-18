const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const markedTextType = new GraphQLObjectType({
  name: 'markedTextType',
  fields: () => ({
    line: { type: new GraphQLNonNull(GraphQLInt) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  })
});

const addMarkedTextInput = new GraphQLInputObjectType({
  name: 'addMarkedTextInput',
  fields: () => ({
    line: { type: new GraphQLNonNull(GraphQLInt) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  })
});

module.exports = {
  markedTextType,
  addMarkedTextInput,
}

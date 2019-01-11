const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

const bookmarkType = new GraphQLObjectType({
  name: 'bookmarkType',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    position: {
      type: new GraphQLNonNull(
        getPositionEnum('positionType'),
      )
    },
    link: { type: new GraphQLNonNull(GraphQLString) }
  })
});

function getPositionEnum(name) {
  const positionEnum = new GraphQLEnumType({
    name: name,
    values: {
      TOP: { value: 'TOP' },
      RIGHT: { value: 'RIGHT' }
    }
  });

  return positionEnum;
};

module.exports = {
  bookmarkType,
  getPositionEnum
};

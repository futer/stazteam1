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
    content: { type: new GraphQLNonNull(GraphQLString) },
    id: {type: new GraphQLNonNull(GraphQLString),
        resolve: data => data._id.toString()
    }
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

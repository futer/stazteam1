const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const { userType } = require('../types/user.type');
const { markedTextType, addMarkedTextInput } = require('../types/marked-text.type');

const commentType = new GraphQLObjectType({
  name: 'commentType',
  fields: () => ({
    id: { 
      type: new GraphQLNonNull(GraphQLID),
      resolve: data => data._id.toString()
    },
    page: { 
      type: new GraphQLNonNull(GraphQLInt) 
    },
    content: { 
      type: new GraphQLNonNull(GraphQLString)
    },
    markedText: { 
      type: new GraphQLNonNull(
        new GraphQLList(markedTextType)
      )
    },
    reviewer: { 
      type: new GraphQLNonNull(userType) 
    },
  })
});

const addCommentInput = new GraphQLInputObjectType({
  name: 'addCommentInput',
  fields: () => ({
    documentId: {
      type: new GraphQLNonNull(GraphQLString) 
    },
    page: { 
      type: new GraphQLNonNull(GraphQLInt) 
    },
    content: { 
      type: new GraphQLNonNull(GraphQLString)
    },
    markedText: { 
      type: new GraphQLNonNull(
        new GraphQLList(addMarkedTextInput)
      )
    }
  })
})

const updateCommentInput = new GraphQLInputObjectType({
  name: 'updateCommentInput',
  fields: () => ({
    id: { 
      type: new GraphQLNonNull(GraphQLString) 
    },
    content: { 
      type: GraphQLString 
    },
  })
})

module.exports = {
  commentType,
  addCommentInput,
  updateCommentInput,
}

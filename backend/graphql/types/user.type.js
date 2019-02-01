const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql');

const userType = new GraphQLObjectType({
    name: 'userType',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString)},
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        pic: { type: GraphQLString },
    })
})

const userObject = new GraphQLInputObjectType({
    name: 'userInput',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString)},
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        password: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        pic: { type: GraphQLString },
    })
})

module.exports = {userType, userObject};
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql');

const userType = new GraphQLObjectType({
    name: 'userType',
    fields: () => ({
        id: { 
            type: new GraphQLNonNull(GraphQLString),
            resolve: data => data._id.toString(),
        },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        role: { type: GraphQLString },
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
        role: { type: GraphQLString },
        pic: { type: GraphQLString },
    })
})

module.exports = {userType, userObject};
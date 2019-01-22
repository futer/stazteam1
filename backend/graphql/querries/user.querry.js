const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const { userType } = require('../types/user.type');
const userResolver  = require('../resolvers/user.resolver');

const userQueries = {
    users: {
        type: new GraphQLList(userType),
        resolve: userResolver.getUsers
    },

    currentUser: {
        type: new GraphQLNonNull(userType),
        resolve: userResolver.getCurrentUser,
    }
};


const userMutations = {
    updateUser: {
        type: userType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            password: { type: GraphQLString },
            pic: { type: GraphQLString },
        },
        resolve: userResolver.updateUser
    }
}

module.exports = { 
    userQueries,
    userMutations,
}
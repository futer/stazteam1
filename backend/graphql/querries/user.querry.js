const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const { userType, uuuuu } = require('../types/user.type');
const userResolver  = require('../resolvers/user.resolver');

const userQueries = {
    users: {
        type: new GraphQLList(userType),
        resolve: userResolver.getUsers
    },

    currentUser: {
        type: userType,
        resolve: userResolver.getCurrentUser,
    }
};


const userMutations = {
    updateUser: {
        type: userType,
        args: {
            user: { type: new GraphQLNonNull(uuuuu) },
        },
        resolve: userResolver.updateUser
    }
}

module.exports = { 
    userQueries,
    userMutations,
}
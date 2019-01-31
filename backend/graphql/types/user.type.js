const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
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
        pic: { type: GraphQLString },
    })
})

module.exports = {userType};
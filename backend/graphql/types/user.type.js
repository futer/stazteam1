const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
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

module.exports = {userType};
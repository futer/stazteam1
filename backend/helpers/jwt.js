const expressJwt = require('express-jwt');
const config = require('../enviromental/enviroments');
const userService = require('../services/user.service')

module.exports = jwt;

function jwt() {
    const secret = config.JWT_SECRET;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log("PAYLOAD", payload.sub._id)
    const user = await userService.getById(payload.sub._id).then(
        user => {
            console.log("ISREVOKED", user);
            done();
        }
    ).catch(err => {
        console.log(err);
        return done(null,true);
    })
};
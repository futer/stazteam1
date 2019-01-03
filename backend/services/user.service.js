const User = require('../models/user.model');
const database = require('../helpers/database');
const jwt = require('jsonwebtoken');
const config = require('../enviromental/enviroments');

module.exports = {
    registrationLocal,
    getById,
    authenticate
};

async function registrationLocal(userParam){
    database.connect();

    if (await User.findOne({ email: userParam.email })) {
        value = 'Email "' + userParam.email + '" is already registered';
        const err = new Error(value);
        err.status = 500;
        err.name = "Email already registered";
        throw err;
    }
    
    const user = new User({
        email: userParam.email,
        firstName: userParam.firstName,
        lastName: userParam.lastName,
        password: userParam.password,
        pic: userParam.pic,
        registered: 'LOCAL'
    })
    
    await user.save();
    database.disconnect();
}

async function getById(id){
    database.connect();
    const u = await User.findById(id.id)
    database.disconnect();
    return u;
}

async function authenticate({email,password}) {
    database.connect();
    user = await User.findOne({email: email});
    if (user === null) {
        value = 'Email "' + email + '" is not registered';
        const err = new Error(value);
        err.status = 500;
        err.name = "Email is not registered";
        throw err;
    }

    if (password === user.password) {
        const { password, ...userWithoutPass } = user.toObject();
        const jwtOptions = { expiresIn: '1d', issuer: 'http://localhost:5000' };
        const token = jwt.sign({sub: userWithoutPass}, config.JWT_SECRET, jwtOptions);
        database.disconnect();
        return {
            token
        };
    }   
}
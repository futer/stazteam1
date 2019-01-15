const User = require('../models/user.model');
const database = require('../helpers/database');
const jwt = require('jsonwebtoken');
const config = require('../enviromental/enviroments');

module.exports = {
    registrationLocal,
    getById,
    authenticate,
    isBanned,
    banUser,
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
}

async function getById(id){
    db = database.connect();
    const u = await User.findOne({_id: id});
    return u;
}

async function authenticate({email,password}) {
    db = database.connect();
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
        const jwtOptions = { expiresIn: '1d' };
        const token = jwt.sign({sub: userWithoutPass}, config.JWT_SECRET, jwtOptions);
        database.disconnect();

        return {
            token
        };
    }   
}

async function isBanned(id) {
    database.connect();
    const user = await User.findOne({_id: id});
    
    if (user) {
        return user.isBanned;
    }

    return user;
}

async function banUser(id) {
    database.connect();
    const user = await User.findOneAndUpdate({ _id: id }, { isBanned: true }, { new: true });

    return user;
}

async function isAdmin(token) {
    database.connect();
    var temp = false;
    const user = await this.getById(jwt.decode(token).sub._id)
        .then(user => {
            if (user.role === jwt.decode(token).sub.role && user.role == "admin"){
                temp = true;
            }
            else {
                value = 'You are not authorized to visit this page';
                const err = new Error(value);
                err.status = 500;
                err.name = "Not authorized";
                throw err;
            }
        });
    return temp;
}

async function isReviewer(token) {
    database.connect();
    var temp = false;
    const user = await this.getById(jwt.decode(token).sub._id)
        .then(user => {
            if (user.role === jwt.decode(token).sub.role && user.role == "reviewer"){
                temp = true;
            }
            else {
                value = 'You are not authorized to visit this page';
                const err = new Error(value);
                err.status = 500;
                err.name = "Not authorized";
                throw err;
            }
        });
    return temp;
}

async function isModerator(token) {
    database.connect();
    var temp = false;
    const user = await this.getById(jwt.decode(token).sub._id)
        .then(user => {
            if (user.role === jwt.decode(token).sub.role && user.role == "moderator"){
                temp = true;
            }
            else {
                value = 'You are not authorized to visit this page';
                const err = new Error(value);
                err.status = 500;
                err.name = "Not authorized";
                throw err;
            }
        });
    return temp;
}

async function isEditor(token) {
    database.connect();
    var temp = false;
    const user = await this.getById(jwt.decode(token).sub._id)
        .then(user => {
            if (user.role === jwt.decode(token).sub.role && user.role == "editor"){
                temp = true;
            }
            else {
                value = 'You are not authorized to visit this page';
                const err = new Error(value);
                err.status = 500;
                err.name = "Not authorized";
                throw err;
            }
        });
    return temp;
}
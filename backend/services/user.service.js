const User = require('../models/user.model');
const database = require('../helpers/database');
const jwt = require('jsonwebtoken');
const config = require('../enviromental/enviroments');
const FB = require('fb');
const request = require('request').defaults({ encoding: null });

module.exports = {
    registrationLocal,
    getById,
    authenticate,
    socialAuthenticate,
    isBanned,
    banUser,
    isAdmin,
    isReviewer,
    isModerator,
    isEditor,
    isLogged,
    getAll,
    getCurrent,
    updateUser
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
        pic: userParam.pic || null,
        registered: 'LOCAL'
    })
    await user.save();
}

async function getById(id){
    db = database.connect();
    const u = await User.findOne({_id: id});
    return u;
}

async function getCurrent(id){
    db = database.connect();
    const u = await User.findOne({_id: id}).select('-password');
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
        const { password, pic, ...userWithoutPass } = user.toObject();
        const jwtOptions = { expiresIn: '1d' };
        const token = jwt.sign({sub: userWithoutPass}, config.JWT_SECRET, jwtOptions);
        database.disconnect();

        return {
            token: token, 
            pic: user.pic
        };
    }   
}

async function socialAuthenticate(user) {
    db = database.connect();
    const u = user;
    try{
        await FB.api('me',{ fields: ['email'], access_token: u.authToken }, function (res) {
            if (res.email === u.email) { 
                User.findOne({email: 'test@test.com'}).then((user) => {
                    if (user){
                        if (user.registered === 'LOCAL_FACEBOOK'){
                            user.registered = 'LOCAL_FACEBOOK'
                            user.firstName = u.firstName,
                            user.lastName = u.lastName;
                            
                            request.get(u.photoUrl, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    data = new Buffer(body).toString('base64');
                                    user.pic = data;
    
                                    User.findOneAndUpdate({_id: user._id}, user, { new: true }).then(user => {
                                        const { password, pic, ...userWithoutPass } = user.toObject();
                                        const jwtOptions = { expiresIn: '1d' };
                                        const token = jwt.sign({sub: userWithoutPass}, config.JWT_SECRET, jwtOptions);
                                        database.disconnect();
                                        console.log(token);
                                        return {
                                            token: token, 
                                            pic: user.pic
                                        };
                                        
                                    });
                                }
                            });
                        }
                    }
                    else {
                        console.log('nouser')
                    }
                })
             }
            else { console.log('ole')}
        });

    }catch{

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

function isLogged(token) {
    let user;
    try {
        user = jwt.decode(token);
    } catch (err) {
        user = false;
    }

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
            if (user.role === jwt.decode(token).sub.role && (user.role == "reviewer" || user.role == "admin")){
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
            if (user.role === jwt.decode(token).sub.role && (user.role == "moderator" || user.role == "admin")){
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
            if (user.role === jwt.decode(token).sub.role && (user.role == "editor" || user.role == "admin")){
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

async function getAll() {
    database.connect();
    const u = await User.find();
    return u;    
}

async function updateUser(data) {
    database.connect();
    const user = await User.findOneAndUpdate({_id: data.id}, data, {new: true});
    return user;
}
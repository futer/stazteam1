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
    updateUser,
    disconnect,
    disconnect_delete,
    disconnect_local,
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
        err.message = "Email is not registered";
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

    const checkUserFB = new Promise ((resolve, reject) => {
        FB.api('me',{ fields: ['email'], access_token: u.authToken }, function (res) {
            if (res.email === u.email) {
                resolve(res)
            } else resolve('Access token is for different user than user asking for login')
        })
    })

    const getUser = new Promise ((resolve, reject) => {
        User.findOne({email: u.email}).then((user) => {
            if (user) {
                resolve(user);
            } else {
                resolve('No user')
            }
        }); 
    });
    
    const getProfilePic = new Promise ((resolve, reject) => {
        request.get(u.photoUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = new Buffer(body).toString('base64');
                resolve(data);
            }
        })
    })

    return await Promise.all([checkUserFB, getUser, getProfilePic]).then(async function(values) {
        if (values[0] === 'Access token is for different user than user asking for login'){
            value = values[0];
            const err = new Error(value);
            err.status = 406;
            err.name = 'Method Not Allowed';
            throw err;
        }
        if (values[1] === 'No user'){
            const newUser = new User({
                firstName: u.firstName,
                lastName: u.lastName,
                email: u.email,
                registered: 'FACEBOOK',
                pic: values[2]
            })
            await newUser.save()
                .catch(err => { throw err; });
            return tokenFromUser(newUser);

        } else {
            if (values[1].registered === 'LOCAL'){
                values[1].firstName = u.firstName,
                values[1].lastName = u.lastName,
                values[1].pic = values[2],
                values[1].registered = 'LOCAL_FACEBOOK'

                await User.findOneAndUpdate({ _id: values[1]._id }, values[1], { new: true })
                    .catch(err => { throw err; });

                return tokenFromUser(values[1]);
            } else {
               return tokenFromUser(values[1]);
            }
        }
    });
}

function tokenFromUser(user){
    const { password, pic, ...userWithoutPass } = user.toObject();
    const jwtOptions = { expiresIn: '1d' };
    const token = jwt.sign({sub: userWithoutPass}, config.JWT_SECRET, jwtOptions);
    return {
        token: token, 
        pic: user.pic
    };
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

async function disconnect(payload) {
    database.connect();
    
    const deletePermissions = new Promise((resolve,reject) => {
        FB.api('me/permissions', 'DELETE',{ access_token: payload.user.authToken }, function (res) {
            resolve(res);
        })
    });

    const updateUser = new Promise((resolve,reject) => {
        User.findOne({email: payload.user.email}).then(user => {
            user.password = payload.password;
            user.registered = 'LOCAL';
            resolve(user);
        }).catch(error => resolve(error))
        
    });

    return await Promise.all([deletePermissions, updateUser]).then(async function(values) {
        if (values[0].success === true) {
            updatedUser = await User.findOneAndUpdate({ email: payload.user.email }, values[1], { new: true })
                .catch(error => { return error });
            return(true);
        }
        else {
            value = 'Your Facebook access token is invalid';
            const err = new Error(value);
            err.status = 500;
            err.name = "Access token invalid";
            throw err;
        }
    });
}

async function disconnect_delete(payload) {
    database.connect();
    const deletePermissions = new Promise((resolve,reject) => {
        FB.api('me/permissions', 'DELETE',{ access_token: payload.user.authToken }, function (res) {
            resolve(res);
        })
    });

    const findUserToDeleteUser = new Promise((resolve,reject) => {
        User.findOne({email: payload.user.email}).then(user => {
            resolve(user);
        }) 
    });

    return await Promise.all([deletePermissions, findUserToDeleteUser
    ]).then(async function(values) {
        if (values[0].success === true) {
            User.findOneAndDelete({email: payload.user.email})
                .catch(error => { throw new Error(error) })
            return (true);
        } else {
            value = 'Your Facebook access token is invalid';
            const err = new Error(value);
            err.status = 500;
            err.name = "Access token invalid";
            throw err;
        }
    });
}

async function disconnect_local(user) {
    const disconnect = new Promise((resolve,reject) => {
        FB.api('me/permissions', 'DELETE',{ access_token: user.user.authToken }, function (res) {
        if (res.success === true){
            resolve(res.success)
            }
            else reject(res)
        }) 
    })

    const updateUser = new Promise((resolve,reject) => {
        User.findOne({email: user.user.email}).then(user => {
            user.registered = 'LOCAL';
            resolve(user);
        }).catch(error => resolve(error))
    });

    return await Promise.all([disconnect, updateUser]).then(async function(values) {
        if (values[0] === true) {
            updatedUser = await User.findOneAndUpdate({ email: user.user.email }, values[1], { new: true })
                .catch(error => { return error });
            return(true);
        }
        else {
            value = 'Your Facebook access token is invalid';
            const err = new Error(value);
            err.status = 500;
            err.name = "Access token invalid";
            throw err;
        }
    });
}
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
    console.log('UUUUU', u);

    const checkUserFB = new Promise ((resolve, reject) => {
        FB.api('me',{ fields: ['email'], access_token: u.authToken }, function (res) {
            if (res.email === u.email) {
                resolve(u.email)
            } else resolve('Access token is for different user than user asking for login')
        })
    })

    const getUser = new Promise ((resolve, reject) => {
        User.findOne({email: 'test@te23st.com'}).then((user) => {
            // if (user){
            //     if (user.registered === 'LOCAL_FACEBOOK'/*CHANGE TO LOCAL*/){
            //         user.registered = 'LOCAL_FACEBOOK'
            //         user.firstName = u.firstName,
            //         user.lastName = u.lastName;
            //     }
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

    return await Promise.all([checkUserFB, getUser, getProfilePic]).then(function(values) {
        console.log("VAL1", values[1])
        if (values[0] === 'Access token is for different user than user asking for login'){
            value = values[0];
            const err = new Error(value);
            err.status = 406;
            err.name = 'Method Not Allowed';
            throw err;
        }
        if (values[1] === 'No user'){
            console.log('TUJESTEM')
            const newUser = new User({
                firstName: u.firstName,
                lastName: u.lastName,
                email: u.email,
                registered: 'FACEBOOK',
                // pic: values[2]
            })
            console.log(newUser);
            newUser.save();
            //resolve(newUser);
        } else {
            if (values[1].registered === 'LOCAL'){
                //UPDATE USER
            } else {
                //LOGIN
            }
        }
    });
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
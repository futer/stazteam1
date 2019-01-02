const User = require('../models/user.model');
const database = require('../helpers/database');

module.exports = {
    registrationLocal,
};

async function registrationLocal(userParam){
    console.log(userParam);
    database.connect()
    if (await User.findOne({ email: userParam.email })) {
        console.log("error")
        value = 'Email "' + userParam.username + '" is already registered';
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
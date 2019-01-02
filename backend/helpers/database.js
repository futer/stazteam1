const config = require('../enviromental/enviroments');
const mongoose = require('mongoose');


exports.connect = function(){
    console.log(config.MONGODB_CONN_URI);
    mongoose.connect(config.MONGODB_CONN_URI, {useNewUrlParser: true });
    mongoose.Promise = global.Promise;
}

exports.disconnect = function(){
    mongoose.disconnect()
}


const config = require('../enviromental/enviroments');
const mongoose = require('mongoose');


exports.connect = function(){
    mongoose.connect(config.MONGODB_CONN_URI, {useNewUrlParser: true, socketTimeoutMS: 60000 });
    mongoose.Promise = global.Promise;
}

exports.disconnect = function(){
    mongoose.disconnect()
}


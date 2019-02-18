const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarkedTextModel = new Schema({
  line: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('MarkedTextModel', MarkedTextModel);

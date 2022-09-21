const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const choreSchema = new Schema(
  {
    name: {
        type: String,
        required: 'Chore must have a name!',
        minlength: 1,
        maxlength: 20
    },
    description: {
        type: String 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    status: {
      type: String,
      default: "Incomplete"
    },
    allowance: {
      type: String
    },
    points: {
      type: Number
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Chore = model('Chore', choreSchema);

module.exports = Chore;

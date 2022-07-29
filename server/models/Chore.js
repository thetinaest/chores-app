const { Schema } = require('mongoose');
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
    complete: {
        type: Boolean,
        required: true,

    },
    allowance: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = choreSchema;

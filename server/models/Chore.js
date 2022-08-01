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
    complete: {
        type: Boolean,
        default: false

    },
    // allowance: {
    //     type: Number
    // },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    paid: {
        type: Boolean,
        default: false
    },
    approve: {
      type: Boolean,
      default: false
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Chore = model('Chore', choreSchema);

module.exports = Chore;

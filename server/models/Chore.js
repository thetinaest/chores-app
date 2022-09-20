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
  //   complete: {
  //     type: Boolean,
  //     default: false
  // },
  //   paid: {
  //       type: Boolean,
  //       default: false
  //   },
  //   approve: {
  //     type: Boolean,
  //     default: false
  //   },
    status: {
      type: String,
      default: "Incomplete"
    },
    allowance: {
      type: String,
      default: '$0.00'
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

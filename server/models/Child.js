const { Schema, model } = require('mongoose');
const choreSchema = require('./Chore');

const childSchema = new Schema(
  {
    username: {
        type: String,
        required: 'You need a username!',
        minlength: 1,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    chores: [choreSchema]
  }
);


const Child = model('Child', childSchema);

module.exports = Child;

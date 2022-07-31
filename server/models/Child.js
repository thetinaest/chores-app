const { Schema, model } = require('mongoose');
const choreSchema = require('./Chore');
const bcrypt = require('bcrypt');

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
    chores: [ 
      {
        type: Schema.Types.ObjectId,
        ref: 'Chore'
      }
    ]
  }
);

// set up pre-save middleware to create password
childSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
childSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};


const Child = model('Child', childSchema);

module.exports = Child;

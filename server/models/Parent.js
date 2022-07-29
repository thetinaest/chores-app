const { Schema, model } = require('mongoose');

const parentSchema = new Schema(
  {
    username: {
        type: String,
        required: 'You need a name!',
        minlength: 1,
        maxlength: 20
    },
    email: {
        type: String,
        required: 'You need an email!',
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
        minlength: 1,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    children: [ChildSchema]

  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Parent = model('Parent', parentSchema);

module.exports = Parent;

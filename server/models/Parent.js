const { Schema, model } = require('mongoose');

const parentSchema = new Schema(
  {
    username: {
        type: String,
        required: 'You need a username!',
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
    children: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Child'
        }
    ]
  }
);


const Parent = model('Parent', parentSchema);

module.exports = Parent;

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
console.log(Schema.Types);

const parentSchema = new Schema(
  {
    username: {
        type: String,
        required: 'You need a username!',
        unique: true,
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
    displayName: {
        type: String,
        required: 'Must have a name!',
        minLength: 1
    },
    children: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Child'
        }
    ]
  }
);

// set up pre-save middleware to create password
parentSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password') || true) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
// compare the incoming password with the hashed password
parentSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const Parent = model('Parent', parentSchema);

module.exports = Parent;

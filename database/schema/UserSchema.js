const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: String
  },
  prefix: String,
  email: {
    type: String,
    index: {
      unique: true
    },
    required: true,
    validate: {
      validator: (value) => {
        return !mongoose.model('User').countDocuments({ email: value }, (err) => {
          if (err) console.log(err)
        })
      }, message: 'Email already exist'
    }
  },
  passWord: {
    type: String,
    minlength: 6,
    required: true
  },
  mobileNumber: String,
  emailVerified: Date,
  mobileVerified: Date,
  status: mongoose.Schema.Types.ObjectId,
},
  {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
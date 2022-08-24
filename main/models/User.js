const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const validateEmail = require('/Users/davidhardin/Desktop/ch/ch18/main/utils/helpers.js')
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],

    // friends: [userSchema],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      },]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;

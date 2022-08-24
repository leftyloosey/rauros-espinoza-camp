const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        minLength: 1,
        maxLength: 280,
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
    userName: {
      type: String,
      required: true,
    },
    // userName: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //   }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


thoughtSchema
  .virtual('reactionCount')

  .get(function () {
    return this.reactions.length;
  });


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
// module.exports = thoughtSchema;

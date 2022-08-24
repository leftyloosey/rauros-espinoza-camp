// const { Schema, model } = require('mongoose');
// const { ObjectId } = require('mongoose').Types;
const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
    userName: {
        type: String,
        required: true,
    
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


reactionSchema
  .virtual('createdAtt')

  .get(function () {
    return Date.now()
  });


const Reaction = model('reaction', reactionSchema);

module.exports = reactionSchema;

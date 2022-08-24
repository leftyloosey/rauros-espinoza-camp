const User = require('../models/User');
const Thought = require('../models/Thought');
const { ObjectId } = require('mongoose').Types;


module.exports = {
  
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => console.log(err).res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err))
    //   .then(function(data) {
        
    //     console.log(data)
    //     console.log(req.body)
    //     User.findOneAndUpdate(
    //       { _id: req.body.userId },
    //       { $addToSet: { thoughts: req.body } },
    //       { runValidators: true, new: true }
    //     )
    // })
     
  
  
    //     .then((user) =>
    //       !user
    //         ? res
    //             .status(404)
    //             .json({ message: 'No user found with that ID' })
    //         : res.json(user)
    //     )
    //     .catch((err) => res.status(500).json(err));
    },
  
  
//   addReaction(req, res) {
//     console.log('You are adding a reaction');
//     console.log(req.body);
//     Thought.findOneAndUpdate(
//       { _id: req.params.thoughtId },
//       { $addToSet: { thoughts: req.body } },
//       // { runValidators: true, new: true }
//     )
//       .then((thought) =>
//         !thought
//           ? res
//               .status(404)
//               .json({ message: 'No thought found with that ID :(' })
//           : res.json(thought)
//       )
//       .catch((err) => res.status(500).json(err));
//   },


addThought(req, res) {
    console.log('You are adding a thot');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }
}

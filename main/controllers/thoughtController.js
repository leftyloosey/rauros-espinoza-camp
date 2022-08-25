const User = require('../models/User');
const Thought = require('../models/Thought');
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose')



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
          ? res.status(404).json({ message: 'no such thought' })
          : res.json(thought)
      )
      .catch((err) => console.log(err).res.status(500).json(err));
  },
  createThought(req, res) {

    const n = new Thought();
    n.thoughtText = req.body.thoughtText;
    n.userName = req.body.userName;
    n.save((err, nThought) => {
    console.log(nThought._id)

    User.findByIdAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: nThought._id } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res
                .status(404)
                .json({ message: 'no such user' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));

    });

  },
  
  
  addReaction(req, res) {
    console.log('adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.body.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'no such thought' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.body.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: 'no such reaction' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },

addThought(req, res) {
    console.log('adding a thought');
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
              .json({ message: 'no such user' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'no attached user',
            })
          : res.json({ message: 'successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !course
          ? res.status(404).json({ message: 'no such course' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
}

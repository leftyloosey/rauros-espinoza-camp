const { ObjectId } = require('mongoose').Types;
// const { User, Thought } = require('');
const User = require('../models/User');
const Thought = require('../models/Thought');


module.exports = {
    createUser(req, res) {
        User.create(req.body)
          .then((User) => res.json(User))
          .catch((err) => res.status(500).json(err));
      },
      getUsers(req, res) {
        User.find()
          .then(async (users) => {
            const userObj = {
              users,
            //   headCount: await headCount(),
            };
            return res.json(userObj);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json({
                  user,
                  // grade: await grade(req.params.studentId),
                })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user' })
              : User.findOneAndUpdate(
                  { users: req.params.userId },
                  { $pull: { users: req.params.userId } },
                  { new: true }
                )
          )
          .then((thought) =>
            !thought
              ? res.status(404).json({
                  message: 'user deleted, but no thoughts found',
                })
              : res.json({ message: 'user successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body } },
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
      },
}
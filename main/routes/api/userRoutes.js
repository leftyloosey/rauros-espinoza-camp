const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  // removeAssignment,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/friends').post(addFriend);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;

const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  addThought,
  // updateCourse,
  // deleteCourse,
} = require('../../controllers/thoughtController.js');

// /api/courses
// router.route('/').get(getThoughts).post(createThought)

// router.route('/:userId').get(getThoughts).post(addThought);
router.route('/').get(getThoughts).post(addThought);

// /api/courses/:courseId
router
  .route('/:thoughtId/thought')
  .get(getSingleThought)
  // .put(updateThought)
  // .delete(deleteThought);

module.exports = router;

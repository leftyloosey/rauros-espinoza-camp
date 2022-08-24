const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  addThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThought)
router.route('/add/:userId').post(createThought)

// router.route('/').get(getThoughts).post(addThought);

router
  .route('/:thoughtId/thought')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;

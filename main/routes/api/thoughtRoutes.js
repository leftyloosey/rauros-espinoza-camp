const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  addReaction,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThought)
router.route('/add/:userId').post(createThought)

router.route('/react').get(getThoughts).post(addReaction);

router
  .route('/:thoughtId/thought')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;

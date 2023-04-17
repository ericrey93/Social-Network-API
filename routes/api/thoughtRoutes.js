const router = require('express').Router();

const {
    allThoughts,
    oneThought,
    newThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// showing all thoughts
router.route('/').get(allThoughts);

// grabbing thought by id, as well as being able to update or delete it
router.route('/:thoughtId').get(oneThought).post(newThought).delete(deleteThought).put(updateThought);


// creating a reaction
router.route('/:thoughtId/reaction').post(createReaction);


// deleting a reaction
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);


module.exports = router;
const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {

    // Getting all thoughts
    allThoughts(req, res) {
        Thought.find()
        .populate('reaction')
        .then((thoughtData) => {
            return res.json(thoughtData);
          })
        .catch ((err) => res.status(500).json(err));
    },

    //Getting one thought
    oneThought(req, res) {
        Thought.findOne( {_id: req.params.thoughtId} )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought with that id found!'});
                return;
            }
            res.json(thoughtData)
        }).catch ((err) => res.status(500).json(err));
    },

    //Creating a new thought
    newThought(req, res) {
        Thought.create(req.body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                { username: req.params.username},
                { $push: {thoughts: thoughtData }},
                {new: true}
            );
       }).then(thoughtData => {
        return res.json(thoughtData);
       }).catch ((err) => res.status(500).json(err));
    },

    // Updating a user's thoughts
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId},
        {$set: req.body },
        {runValidators: true, new: true})
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought with that id found!'});
                return;
            }
            res.json(thoughtData)
        }).catch ((err) => res.status(500).json(err));
    },

    // Deleting a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought with that id found!'});
                return;
            }
            res.json(thoughtData)
        }).catch ((err) => res.status(500).json(err));
    },

    //Creating reaction to thought
    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {runValidators: true, new: true}, 
            {$push: {reaction: body}})
        .then(reactionData => {
            if(!reactionData) {
                res.status(404).json({ message: 'Error creating reaction!'});
                return;
            }
            res.json(reactionData);
        }).catch ((err) => res.status(500).json(err));
    },

    //Deleting a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId},
            {$pull: {reaction: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true})
            .then(reactionData => {
                if(!reactionData) {
                    res.status(404).json({ message: 'Error deleting reaction!'});
                    return;
                }
                res.json(reactionData);
            }).catch ((err) => res.status(500).json(err));
    }
};
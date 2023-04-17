const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {

    // Get all users
    getUsers(req, res) {
        User.find()
        .populate('friends')
        .populate({
            path: 'thoughts',
            populate: {path: 'reaction'},
        })
        .then(userData => res.json(userData))
        .catch ((err) => res.status(500).json(err));
    },

    // Getting one user by id along with thought and friend data
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user with that id found!'});
                return;
            }
            res.json(userData)
        }).catch ((err) => res.status(500).json(err));
    },

    //Updating a user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {runValidators: true, new: true})
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user with that id found!'});
                    return;
                }
                res.json(userData)
            }).catch ((err) => res.status(500).json(err));
    },

    //Creating a user
    createUser(req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch ((err) => res.status(500).json(err));
    },

    //Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: "No user with that id found." });
                return;
            } Thought.deleteMany({ _id: { $in: userData.thoughts } });
            res.json({ message: "User has been deleted" })
        }).catch((err) => res.status(500).json(err));
    },

    //Adding friend to user's list
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true }
        ).then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user with that id found!'});
                return;
            }
            res.json(userData)
        }).catch ((err) => res.status(500).json(err));
    },

    //Deleting a friend from user's list
    deleteFriend(req, res) {
        User.findOneAndDelete(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
            ).then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user with that id found!'});
                    return;
                }
                res.json(userData)
            }).catch ((err) => res.status(500).json(err));
    },
};

module.exports = userController;


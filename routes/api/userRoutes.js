const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    updateUser,
    createUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');
// will grab all users at homepage
router.route('/').get(getUsers).post(createUser);

// grabbing single user by id, and being able to update of delete the user
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// adding new friend to user's list, or deleting friend from list
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
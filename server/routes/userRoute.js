const express = require('express');
const auth = require('../middlewares/auth');
const {
    signup,
    login,
    logout,
    getMyDetails,
    getUserByUsername,
    followUnfollow,
    updateProfile,
    deleteProfile,
    search,
} = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/logout').post(auth, logout);

router.route('/me').get(auth, getMyDetails);

router
    .route('/user/:username')
    .get(auth, getUserByUsername)
    .patch(auth, updateProfile)
    .delete(auth, deleteProfile);

router.route('/user/:username/follow').get(auth, followUnfollow);

router.route('/search/:content').get(search)

module.exports = router;

const express = require('express');
const auth = require('../middlewares/auth');
const multer = require('multer');
const {
    getPosts,
    newPost,
    getPostById,
    deletePost,
    updateCaption,
    likeUnlikePost,
    saveUnsavePost,
    getPostsByUsername,
    getSavedPosts,
} = require('../controllers/postController');
const { uploadPost } = require('../utils/awsFunctions');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router
    .route('/')
    .get(auth, getPosts)
    .post(
        auth,
        upload.fields([
            { name: 'post', maxCount: 1 },
            { name: 'thumbnail', maxCount: 1 },
        ]),
        uploadPost,
        newPost
    );

router.route('/saves').get(auth, getSavedPosts);

router
    .route('/:id')
    .get(getPostById)
    .patch(auth, updateCaption)
    .delete(deletePost);

router.route('/:id/like').get(auth, likeUnlikePost);

router.route('/:id/save').get(auth, saveUnsavePost);

module.exports = router;

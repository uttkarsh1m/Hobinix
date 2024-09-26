const express = require('express');
const auth = require('../middlewares/auth');
const {
    newAlbum,
    newReleases,
    getTrendingAlbums,
    getTrendingSongs,
    getAlbumById,
    getSongById,
    getSongsByArtist,
    getAlbumsByArtist,
    likeUnlikeAlbum,
    likeUnlikeSong,
    saveUnsaveSong,
    saveUnsaveAlbum,
    getSavedAlbums,
    getSavedSongs,
} = require('../controllers/musicController');
const multer = require('multer');
const { uploadSongs } = require('../utils/awsFunctions');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.route('/albums').post(
    auth,
    upload.fields([
        { name: 'albumThumb', maxCount: 1 },
        { name: 'songThumbs'},
        { name: 'songs'},
    ]),
    uploadSongs,
    newAlbum
);

router.route('/albums/new_releases').get(newReleases);

router.route('/albums/trendings').get(getTrendingAlbums);
router.route('/songs/trendings').get(getTrendingSongs);

router.route('/albums/saves').get(auth, getSavedAlbums);
router.route('/songs/saves').get(auth, getSavedSongs);

router.route('/albums/:id').get(auth, getAlbumById);
router.route('/songs/:id').get(auth, getSongById);

router.route('/albums/artist/:username').get(auth, getAlbumsByArtist);
router.route('/songs/artist/:username').get(auth, getSongsByArtist);

router.route('/albums/like/:id').get(auth, likeUnlikeAlbum)
router.route('/songs/like/:id').get(auth, likeUnlikeSong)

router.route('/albums/save/:id').get(auth, saveUnsaveAlbum)
router.route('/songs/save/:id').get(auth, saveUnsaveSong)

module.exports = router;

const catchAsync = require('../middlewares/catchAsync');
const customError = require('../utils/customError');
const User = require('../models/userModel');
const Song = require('../models/songModel');
const Album = require('../models/albumModel');
const { getAlbumThumbUrl, getSongUrls } = require('../utils/awsFunctions');

exports.newAlbum = catchAsync(async (req, res, next) => {
    // console.log(req.body.songDetails[0].title);
    const songIds = [];
    for (let i = 0; i < req.songs.length; i++) {
        const songDetails = {
            title: req.songs.length === 1 ? req.body.songTitles : req.body.songTitles[i],
            track: req.songs[i],
            thumbnail: req.songThumbs[i],
            artist: req.user,
        };
        const song = await Song.create(songDetails);
        songIds.push(song._id);
    }
    const albumDetails = {
        title: req.body.albumDetails,
        thumbnail: req.albumThumb,
        songs: songIds,
        artist: req.user,
    };
    const album = await Album.create(albumDetails);
    for(let i=0; i<album.songs.length;i++){
        const song = await Song.findById(album.songs[i]);
        song.album = album._id
        await song.save()
    }
    res.status(200).json({
        status: 'success',
        data: { album },
    });
});

exports.getTrendingAlbums = catchAsync(async (req, res) => {
    let albums = await Album.find().populate({ path: 'songs', populate: {path: 'artist', select: 'username'} }).populate('artist', 'username');
    await getAlbumThumbUrl(albums);
    albums = albums
        .map(e => ({ ...e._doc, likesNum: e.likes.length }))
        .sort((a, b) => b.likesNum - a.likesNum);

    res.status(200).json({
        status: 'success',
        data: { albums },
    });
});
exports.getTrendingSongs = catchAsync(async (req, res) => {
    let songs = await Song.find().populate('artist', 'username');
    await getSongUrls(songs);
    songs = songs
        .map(e => ({ ...e._doc, likesNum: e.likes.length }))
        .sort((a, b) => b.likesNum - a.likesNum);

    res.status(200).json({
        status: 'success',
        data: { songs },
    });
});

exports.getAlbumById = catchAsync(async (req, res) => {
    const album = await Album.findById(req.params.id).populate({ path: 'songs', populate: {path: 'artist', select: 'username'} }).populate('artist', 'username');
    if (!album) throw new customError('No album Found', 404);
    await getAlbumThumbUrl([album]);
    await getSongUrls(album.songs);
    res.status(200).json({
        status: 'success',
        data: { album },
    });
});
exports.getSongById = catchAsync(async (req, res) => {
    const song = await Song.findById(req.params.id).populate('artist', 'username');
    if (!song) throw new customError('No song found', 404);
    await getSongUrls([song]);
    res.status(200).json({
        status: 'success',
        data: { song },
    });
});

exports.getAlbumsByArtist = catchAsync(async (req, res) => {
    const artist = await User.findOne({ username: req.params.username });
    if (!artist) throw new customError('No artist has been found', 400);
    let albums = await Album.find({ artist }).populate({ path: 'songs', populate: {path: 'artist', select: 'username'} }).populate('artist', 'username');;
    await getAlbumThumbUrl(albums);
    albums = albums
        .map(e => ({ ...e._doc, likesNum: e.likes.length }))
        .sort((a, b) => b.likesNum - a.likesNum);

    res.status(200).json({
        status: 'success',
        data: { albums },
    });
});
exports.getSongsByArtist = catchAsync(async (req, res) => {
    const artist = await User.findOne({ username: req.params.username });
    if (!artist) throw new customError('No artist has been found', 400);
    let songs = await Song.find({ artist }).populate('artist', 'username');;
    await getSongUrls(songs);
    songs = songs
        .map(e => ({ ...e._doc, likesNum: e.likes.length }))
        .sort((a, b) => b.likesNum - a.likesNum);

    res.status(200).json({
        status: 'success',
        data: { songs },
    });
});

exports.newReleases = catchAsync(async(req, res)=>{
    let albums = await Album.find().populate({ path: 'songs', populate: {path: 'artist', select: 'username'} }).populate('artist', 'username');;
    albums.reverse()
    await getAlbumThumbUrl(albums);
    res.status(200).json({
        status: 'success',
        data: { albums },
    });
})

exports.likeUnlikeAlbum = catchAsync(async (req, res) => {
    const user = req.user;
    const album = await Album.findById(req.params.id).populate({ path: 'songs', populate: {path: 'artist', select: 'username'} }).populate('artist', 'username');
    if (!album) throw new customError('No album has been found', 400);
    let msg;
    if (!album.likes.includes(user._id)) {
        album.likes.push(user._id);
        msg = 'liked';
    } else {
        const index = album.likes.indexOf(user._id);
        album.likes.splice(index, 1);
        msg = 'unliked';
    }
    await album.save();
    res.status(200).json({
        status: 'success',
        message: `You have succesfully ${msg} album ${album.title}`,
        data: { album, user },
    });
});
exports.likeUnlikeSong = catchAsync(async (req, res) => {
    const user = req.user;
    const song = await Song.findById(req.params.id).populate('artist', 'username');;
    if (!song) throw new customError('No song has been found', 400);
    let msg;
    if (!song.likes.includes(user._id)) {
        song.likes.push(user._id);
        msg = 'liked';
    } else {
        const index = song.likes.indexOf(user._id);
        song.likes.splice(index, 1);
        msg = 'unliked';
    }
    await song.save();
    res.status(200).json({
        status: 'success',
        message: `You have succesfully ${msg} song ${song.title}`,
        data: { song, user },
    });
});

exports.saveUnsaveAlbum = catchAsync(async (req, res) => {
    const user = req.user;
    const album = await Album.findById(req.params.id).populate({ path: 'songs', populate: {path: 'artist', select: 'username'} }).populate('artist', 'username');
    if (!album) throw new customError('No album has been found', 400);
    let msg;
    if (!album.saves.includes(user._id)) {
        album.saves.push(user._id);
        user.saved.push({ post: album._id, postModel: 'album' });
        msg = 'saved';
    } else {
        let index = album.saves.indexOf(user._id);
        album.saves.splice(index, 1);
        index = user.saved.indexOf({ post: album._id, postModel: 'album' });
        user.saved.splice(index, 1);
        msg = 'unsaved';
    }
    await album.save();
    await user.save();
    res.status(200).json({
        status: 'success',
        message: `You have succesfully ${msg} album ${album.title}`,
        data: { album, user },
    });
});
exports.saveUnsaveSong = catchAsync(async (req, res) => {
    const user = req.user;
    const song = await Song.findById(req.params.id).populate('artist', 'username');
    if (!song) throw new customError('No song has been found', 400);
    let msg;
    if (!song.saves.includes(user._id)) {
        song.saves.push(user._id);
        user.saved.push({ post: song._id, postModel: 'song' });
        msg = 'saved';
    } else {
        let index = song.saves.indexOf(user._id);
        song.saves.splice(index, 1);
        index = user.saved.indexOf({ post: song._id, postModel: 'song' });
        user.saved.splice(index, 1);
        msg = 'unsaved';
    }
    await song.save();
    await user.save();
    res.status(200).json({
        status: 'success',
        message: `You have succesfully ${msg} song ${song.title}`,
        data: { song, user },
    });
});

exports.deleteAlbum = catchAsync(async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (!album) throw new customError('No album has been found', 400);
    if (req.user.username !== album.artist)
        throw new customError("You don't have permission to delete it", 400);
});
exports.deleteSong = catchAsync(async (req, res) => {
    const song = await Song.findById(req.params.id);
    if (!song) throw new customError('No song has been found', 400);
    if (req.user.username !== song.artist)
        throw new customError("You don't have permission to delete it", 400);
});

exports.getSavedAlbums = catchAsync(async(req, res) =>{
    const albums = await Album.find({saves: req.user._id}).populate({ path: 'songs', populate: {path: 'artist', select: 'username'} }).populate('artist', 'username');
    await getAlbumThumbUrl(albums);
    res.status(200).json({
        status: 'success',
        data: { albums },
    });
})

exports.getSavedSongs = catchAsync(async(req, res) => {
    let songs = await Song.find({saves: req.user._id}).populate('artist', 'username');
    await getSongUrls(songs);
    res.status(200).json({
        status: 'success',
        data: { songs },
    });
})
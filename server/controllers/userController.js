const User = require('../models/userModel');
const customError = require('../utils/customError');
const catchAsync = require('../middlewares/catchAsync');
const Album = require('../models/albumModel')
const Song = require('../models/songModel')
const Post = require('../models/PostModel');
const { getPostUrls, getAlbumThumbUrl, getSongUrls } = require('../utils/awsFunctions');

exports.signup = catchAsync(async (req, res) => {
    // console.log(req.body);
    const user = await User.create(req.body);
    const token = await user.createJwt();
    // console.log(token,user)
    res.status(200)
        .cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_EXPIRE),
            httpOnly: true,
            secure: true,
        })
        .json({
            status: 'success',
            message: 'You have successfully registered',
            data: { user },
        });
});

exports.login = catchAsync(async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password)
        throw new customError('Please provide email & password', 400);
    const user = await User.findOne({ email });
    if (!(user && (await user.passwordCompare(password))))
        throw new customError('Invalid email or password', 400);
    const token = await user.createJwt();
    // console.log(token)
    // console.log(req);
    res.status(200)
        .cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_EXPIRE),
            httpOnly: true,
            secure: true,
        })
        .json({
            status: 'success',
            message: 'You have successfully logged in',
            data: { user },
        });
});

exports.logout = catchAsync(async (req, res) => {
    const { device } = req.body;
    const user = req.user;
    if (device === 'allDevices') user.tokens = [];
    else user.tokens = user.tokens.filter(e => e.token !== req.token);
    await user.save();
    res.status(200)
        .clearCookie('jwt')
        .json({
            status: 'success',
            data: {
                message: 'You have logged out successfully',
                user,
            },
        });
});

exports.getMyDetails = catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id).populate(
        'followers followings'
    );
    res.status(200).json({
        status: 'success',
        data: { user },
    });
});

exports.getUserByUsername = catchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.username }).populate(
        'followers followings'
    );
    if (!user) throw new customError('User not found', 400);
    res.status(200).json({
        status: 'success',
        data: { user },
    });
});

exports.followUnfollow = catchAsync(async (req, res) => {
    const user = req.user;
    const requestedUser = await User.findOne({ username: req.params.username });
    if (!requestedUser) throw new customError('User not found', 400);
    let msg;
    if (!user.followings.includes(requestedUser._id)) {
        user.followings.push(requestedUser._id);
        requestedUser.followers.push(user._id);
        msg = 'followed';
    } else {
        let index = user.followings.indexOf(requestedUser._id);
        user.followings.splice(index, 1);
        index = requestedUser.followers.indexOf(user._id);
        requestedUser.followers.splice(index, 1);
        msg = 'unfollowed';
    }
    await user.save();
    await requestedUser.save();
    res.status(200).json({
        status: 'success',
        data: {
            message: `You have successfully ${msg} ${requestedUser.username}`,
            user,
            requestedUser,
        },
    });
});

exports.updateProfile = catchAsync(async (req, res) => {
    const user = req.user;
    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
        new: true,
        runValidators: true,
    });
    // avatar
    res.status(200).json({
        status: 'success',
        data: {
            message: 'Your profile has been updated.',
            user: updatedUser,
        },
    });
});

exports.deleteProfile = catchAsync(async (req, res) => {
    const user = req.user;
    for (let i = 0; i < user.followers.length; i++) {
        const follower = await User.findById(user.followers[i]);
        const index = follower.followings.indexOf(user._id);
        follower.followings.splice(index, 1);
        await follower.save();
    }
    for (let i = 0; i < user.followings.length; i++) {
        const following = await User.findById(user.followings[i]);
        const index = following.followers.indexOf(user._id);
        following.followers.splice(index, 1);
        await following.save();
    }
    await user.deleteOne();
    res.status(200).json({
        status: 'success',
        data: {
            message: 'Your account has been deleted successfully.',
        },
    });
});

exports.search = catchAsync(async (req, res) =>{
    const content = req.params.content.toLowerCase()
    const users = await User.find();
    const filteredUsers = users.filter(e =>{
        return e.username.toLowerCase().includes(content)
    })

    const posts = await Post.find().populate('postedBy', 'username')
    const filteredPosts = posts.filter(e =>{
        return e.caption && e.caption.toLowerCase().includes(content)
    })
    await getPostUrls(filteredPosts)

    const photos = filteredPosts.filter(e=>{
        return e.category === 'gallery'
    })
    const dances = filteredPosts.filter(e=>{
        return e.category === 'dance'
    })

    const albums = await Album.find().populate('artist', 'username')
    const filteredAlbums = albums.filter(e =>{
        return e.title && e.title.toLowerCase().includes(content)
    })
    await getAlbumThumbUrl(filteredAlbums)

    const songs = await Song.find().populate('artist', 'username')
    const filteredSongs = songs.filter(e =>{
        return e.title && e.title.toLowerCase().includes(content)
    })
    await getSongUrls(filteredSongs)

    res.status(200).json({
        users: filteredUsers,
        photos,
        dances,
        albums: filteredAlbums,
        songs: filteredSongs
    })
})
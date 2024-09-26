const customError = require('../utils/customError');
const catchAsync = require('../middlewares/catchAsync');
const Post = require('../models/PostModel');
const User = require('../models/userModel');
const { deletePost, getPostUrls } = require('../utils/awsFunctions');

exports.newPost = catchAsync(async (req, res) => {
    const user = req.user;
    console.log(req.body, req.body);
    postDetails = {
        ...req.body,
        post: req.post,
        category: req.category,
        postedBy: user._id,
    };
    if (req.thumb) postDetails = { ...postDetails, thumbnail: req.thumb };
    console.log(postDetails)
    const post = await Post.create(postDetails);
    console.log(post)
    user.posts.push({ post: post._id, postModel: 'post' });
    await user.save();
    await getPostUrls([post]);
    res.status(200).json({
        status: 'success',
        data: post,
    });
});

exports.getPosts = catchAsync(async (req, res) => {
    // logic     category
    const allPosts = await Post.find({ category: req.category }).populate('postedBy', 'username');
    await getPostUrls(allPosts);
    res.status(200).json({
        status: 'success',
        data: allPosts,
    });
    // pagination
});

exports.getPostById = catchAsync(async (req, res) => {
    console.log('njjjnjj', req.params)
    const post = await Post.findById(req.params.id).populate('postedBy', 'username');
    if (!post) throw new customError('No post found', 404);
    await getPostUrls([post]);
    res.status(200).json({
        status: 'success',
        data: post,
    });
});

exports.deletePost = catchAsync(async (req, res) => {
    const user = req.user;
    const post = await Post.findById(req.params.id);
    if (!post) throw new customError('No post found', 404);
    if (post.postBy !== req.user._id)
        throw new customError("You don't have permission to delete", 401);
    for (const i of post.saves) {
        const usr = await User.findById(i);
        const index = usr.saved.indexOf(post._id);
        usr.saved.splice(index, 1);
        await usr.save();
    }
    const index = user.posts.indexOf(post._id);
    user.posts.splice(index, 1);
    await user.save();
    await deletePost(post.post);
    await post.deleteOne();
    res.status(200).json({
        status: 'success',
        message: 'You have successfully deleted the photo',
        data: post,
    });
});

exports.updateCaption = catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) throw new customError('No post found', 404);
    if (post.postBy !== req.user._id)
        throw new customError("You don't have permission to delete", 401);
    post.caption = req.body.caption;
    await post.save();
    res.status(200).json({
        status: 'success',
        message: 'Caption is updated',
        data: post,
    });
});

exports.likeUnlikePost = catchAsync(async (req, res) => {
    const user = req.user;
    const post = await Post.findById(req.params.id);
    if (!post) throw new customError('No post found', 404);
    let msg;
    if (!post.likes.includes(user._id)) {
        post.likes.push(user._id);
        msg = 'liked';
    } else {
        const index = post.likes.indexOf(user._id);
        post.likes.splice(index, 1);
        msg = 'unliked';
    }
    await post.save();
    res.status(200).json({
        status: 'success',
        message: `You have succesfully ${msg} this post`,
        data: { post, user },
    });
});

exports.saveUnsavePost = catchAsync(async (req, res) => {
    const user = req.user;
    const post = await Post.findById(req.params.id);
    if (!post) throw new customError('No post found', 404);
    let msg;
    if (!post.saves.includes(user._id)) {
        post.saves.push(user._id);
        user.saved.push({ post: post._id, postModel: 'post' });
        msg = 'saved';
    } else {
        let index = post.saves.indexOf(user._id);
        post.saves.splice(index, 1);
        index = user.saved.indexOf({ post: post._id, postModel: 'post' });
        user.saved.splice(index, 1);
        msg = 'unsaved';
    }
    await post.save();
    await user.save();
    res.status(200).json({
        status: 'success',
        message: `You have succesfully ${msg} this post`,
        data: { post, user },
    });
});

exports.getSavedPosts = catchAsync(async(req, res) =>{
    const posts = await Post.find({saves: req.user._id, category: req.category}).populate('postedBy', 'username')
    await getPostUrls(posts);
    res.status(200).json({
        status: 'success',
        data: { posts },
    });
})
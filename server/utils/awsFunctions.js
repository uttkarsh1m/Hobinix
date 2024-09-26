const {
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} = require('@aws-sdk/client-s3');
const s3 = require('../config/awsConfig');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const Bucket = process.env.BUCKET_NAME;
const expireTime = process.env.POST_EXPIRY;

exports.uploadPost = async (req, res, next) => {
    let Key = uuidv4() + path.extname(req.files['post'][0].originalname);
    let command = new PutObjectCommand({
        Bucket,
        Key,
        Body: req.files['post'][0].buffer,
        ContentType: req.files['post'][0].mimetype,
    });
    await s3.send(command);
    req.post = Key;

    if (req.files['thumbnail']) {
        Key = uuidv4() + path.extname(req.files['thumbnail'][0].originalname);
        command = new PutObjectCommand({
            Bucket,
            Key,
            Body: req.files['thumbnail'][0].buffer,
            ContentType: req.files['thumbnail'][0].mimetype,
        });
        await s3.send(command);
        req.thumb = Key;
    }

    next();
};

exports.uploadSongs = async (req, res, next) => {
    const songThumbArr = [],
        songsArr = [];
    const albumThumb = req.files['albumThumb'][0];
    let Key = uuidv4() + path.extname(albumThumb.originalname);
    const command = new PutObjectCommand({
        Bucket,
        Key,
        Body: albumThumb.buffer,
        ContentType: albumThumb.mimetype,
    });
    await s3.send(command);
    req.albumThumb = Key;

    for (const i of req.files['songThumbs']) {
        Key = uuidv4() + path.extname(i.originalname);
        const command = new PutObjectCommand({
            Bucket,
            Key,
            Body: i.buffer,
            ContentType: i.mimetype,
        });
        await s3.send(command);
        songThumbArr.push(Key);
    }
    req.songThumbs = songThumbArr;

    for (const i of req.files['songs']) {
        Key = uuidv4() + path.extname(i.originalname);
        const command = new PutObjectCommand({
            Bucket,
            Key,
            Body: i.buffer,
            ContentType: i.mimetype,
        });
        await s3.send(command);
        songsArr.push(Key);
    }
    req.songs = songsArr;

    next();
};

exports.deletePost = async post => {
    const command = new DeleteObjectCommand({
        Bucket,
        Key: post,
    });
    await s3.send(command);
};

exports.getPostUrls = async posts => {
    for (let i of posts) {
        const command = new GetObjectCommand({
            Bucket,
            Key: i.post,
        });
        i.url = await getSignedUrl(s3, command, { expiresIn: expireTime });
        if (i.category === 'dance') {
            const command = new GetObjectCommand({
                Bucket,
                Key: i.thumbnail,
            });
            i.thumbUrl = await getSignedUrl(s3, command, {
                expiresIn: expireTime,
            });
        }
        await i.save();
    }
};

exports.getAlbumThumbUrl = async albums => {
    for (let i of albums) {
        const command = new GetObjectCommand({
            Bucket,
            Key: i.thumbnail,
        });
        i.thumbUrl = await getSignedUrl(s3, command, { expiresIn: expireTime });
        await i.save();
    }
};

exports.getSongUrls = async songs => {
    for (let i of songs) {
        let command = new GetObjectCommand({
            Bucket,
            Key: i.track,
        });
        i.url = await getSignedUrl(s3, command, { expiresIn: expireTime });

        command = new GetObjectCommand({
            Bucket,
            Key: i.thumbnail,
        });
        i.thumbUrl = await getSignedUrl(s3, command, { expiresIn: expireTime });
        await i.save();
    }
};

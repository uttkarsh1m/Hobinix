module.exports = (req, res, next) => {
    if (req.originalUrl.includes('gallery')) req.category = 'gallery';
    else req.category = 'dance';

    next();
};

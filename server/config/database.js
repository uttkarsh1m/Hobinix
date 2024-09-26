const mongoose = require('mongoose');
const db = process.env.db;

const connecttodatabase = () => {
    mongoose
        .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('connected to database...');
        })
        .catch(e => {
            console.log(e);
        });
};

module.exports = connecttodatabase;

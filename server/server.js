require('dotenv').config();
const express = require('express');
const database = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT;

database();
app.use(
    cors({
        // origin: "https://hobinix-client.vercel.app",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoute = require('./routes/userRoute');
const musicRoute = require('./routes/musicRoute');
const postRoute = require('./routes/postRoute');
const postType = require('./middlewares/postType');

app.use('/api', userRoute);
app.use('/api/music', musicRoute);
app.use('/api/gallery', postType, postRoute);
app.use('/api/dance', postType, postRoute);

// Global ErrorHandler
const GlobalErrorHandler = require('./middlewares/errorHandler');
app.use(GlobalErrorHandler);

app.listen(port, () => {
    console.log(`listening at port ${port}`);
});

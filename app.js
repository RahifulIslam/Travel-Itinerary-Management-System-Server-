const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const userRouter = require('./routers/userRouter');

const app = express();

app.use(compression());
app.use(morgan());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);

module.exports = app;
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { initClientDbConnection, sequelize } from './db/mysql.js';

import './models/categories.js';
import './models/specialites.js';
import './models/artisans.js';


initClientDbConnection();

await sequelize.sync();

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Enable the application to be consumed by external React application
app.use(cors({
  origin: process.env.WEB_APP_HOST,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

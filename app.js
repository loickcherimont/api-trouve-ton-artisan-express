import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import indexRouter from './routes/index.js';
import { initClientDbConnection } from './db/mysql.js';
import swaggerSpec from './config/swagger.js';

await initClientDbConnection();

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

app.use('/api', indexRouter);

// Serve the interactive Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	const status = err.status || 500;
	const message = process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error';

	res.status(status).json({ error: status, message });
});

export default app;

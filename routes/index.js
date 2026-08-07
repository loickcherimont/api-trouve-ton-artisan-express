import express from 'express';
import categoriesRoute from './categories.js';

const router = express.Router();

router.use('/categories', categoriesRoute);

export default router;

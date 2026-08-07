import express from 'express';
import categoriesRoute from './categories.js';
import artisansRoute from './artisans.js';

const router = express.Router();

router.use('/categories', categoriesRoute);
router.use('/artisans', artisansRoute);

export default router;

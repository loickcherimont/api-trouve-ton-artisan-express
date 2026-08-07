import express from 'express';
import categoriesRoute from './categories.js';
import artisansRoute from './artisans.js';
import formRoute from './form.js';

/**
 * Main router of the API.
 * Groups the feature routers and exposes them under their
 * base path: /api/categories, /api/artisans and /api/contact.
 */
const router = express.Router();

router.use('/categories', categoriesRoute);
router.use('/artisans', artisansRoute);
router.use('/contact', formRoute);

export default router;

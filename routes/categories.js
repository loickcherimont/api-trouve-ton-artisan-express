import express from 'express';
import { getAllCategories } from '../services/categories.js';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;

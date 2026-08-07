import express from 'express';
import { getAllCategories } from '../services/categories.js';

const router = express.Router();

/**
 * GET /api/categories
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve all categories.
 *     description: Returns the list of all professional categories.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The list of all categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

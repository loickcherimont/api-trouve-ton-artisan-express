import express from 'express';
import { getArtisans, getArtisanById } from '../services/artisans.js';

const router = express.Router();

/**
 * GET /api/artisans
 * @swagger
 * /api/artisans:
 *   get:
 *     summary: Retrieve all artisans.
 *     description: Returns the list of all craftsmen registered on the platform.
 *     tags: [Artisans]
 *     parameters:
 *       - in: query
 *         name: est_en_top_trois
 *         required: false
 *         description: When `true`, only returns the artisans featured in the home page top 3.
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: nom
 *         required: false
 *         description: Search the artisans whose name contains this string (case-insensitive).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of all artisans.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artisan'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', async (req, res, next) => {
	try {
		const filters = {};

		if (req.query.est_en_top_trois !== undefined) {
			filters.estEnTopTrois = req.query.est_en_top_trois === 'true';
		}

		if (req.query.nom) {
			filters.nom = req.query.nom.trim();
		}

		const artisans = await getArtisans(filters);
		return res.status(200).json(artisans);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

/**
 * GET /api/artisans/{id}
 * @swagger
 * /api/artisans/{id}:
 *   get:
 *     summary: Retrieve a single artisan by its id.
 *     tags: [Artisans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the artisan to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested artisan.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artisan'
 *       404:
 *         description: No artisan found with this id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', async (req, res, next) => {
	try {
		const artisan = await getArtisanById(req.params.id);

		if (!artisan) return res.status(404).json({ error: 404, message: 'Artisan introuvable' });
		return res.status(200).json(artisan);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

export default router;

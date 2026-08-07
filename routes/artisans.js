import express from 'express';
import { getAllArtisans, getArtisanById } from '../services/artisans.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
	const artisans = await getAllArtisans();
	return res.status(200).json(artisans);
  } catch (error) {
	console.error(error);
	next(error);
  }
});

router.get('/:id', async (req, res, next) => {
	try {
		const artisan = await getArtisanById(req.params.id);

		if(!artisan) return res.status(404).json({ error: 404, message: 'Artisan introuvable'});
		return res.status(200).json(artisan);
	} catch (error) {
		console.error(error);
		next(error);
	}
})

export default router;

import Artisans from '../models/artisans.js';

export async function getAllArtisans() {
	return Artisans.findAll();
}

export async function getArtisanById(id) {
	return Artisans.findByPk(id);
}
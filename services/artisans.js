import Artisans from '../models/artisans.js';

/**
 * Retrieves all artisans from the database.
 * @returns {Promise<import('sequelize').Model[]>} The list of all artisans.
 */
export async function getAllArtisans() {
	return Artisans.findAll();
}

/**
 * Retrieves a single artisan by its primary key.
 * @param {number} id - The id of the artisan to find.
 * @returns {Promise<import('sequelize').Model|null>} The artisan, or null if not found.
 */
export async function getArtisanById(id) {
	return Artisans.findByPk(id);
}

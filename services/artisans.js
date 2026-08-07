import { Op } from 'sequelize';
import Artisans from '../models/artisans.js';
import Specialites from '../models/specialites.js';
import Categories from '../models/categories.js';

/**
 * Retrieves artisans from the database, optionally filtered.
 * The specialty and its category are always included so the frontend can
 * display the specialty name and build the category links without extra calls.
 *
 * @param {Object} [filters] - The filters to apply.
 * @param {boolean} [filters.estEnTopTrois] - When defined, only returns the
 *   artisans whose `est_en_top_trois` flag matches this value.
 * @param {string} [filters.nom] - When defined, only returns the artisans whose
 *   name contains this string (case-insensitive).
 * @returns {Promise<import('sequelize').Model[]>} The list of matching artisans.
 */
export async function getArtisans(filters = {}) {
	const where = {};

	if (filters.estEnTopTrois !== undefined) {
		where.est_en_top_trois = filters.estEnTopTrois;
	}

	if (filters.nom) {
		where.nom = { [Op.like]: `%${filters.nom}%` };
	}

	return Artisans.findAll({
		where,
		include: [
			{
				model: Specialites,
				include: [Categories],
			},
		],
	});
}

/**
 * Retrieves a single artisan by its primary key.
 * The specialty and its category are included so the detail page can display
 * the specialty name without an extra call.
 *
 * @param {number} id - The id of the artisan to find.
 * @returns {Promise<import('sequelize').Model|null>} The artisan, or null if not found.
 */
export async function getArtisanById(id) {
	return Artisans.findByPk(id, {
		include: [
			{
				model: Specialites,
				include: [Categories],
			},
		],
	});
}

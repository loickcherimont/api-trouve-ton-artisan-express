import Categories from '../models/categories.js';

/**
 * Retrieves all categories from the database.
 * @returns {Promise<import('sequelize').Model[]>} The list of all categories.
 */
export async function getAllCategories() {
	return Categories.findAll();
}

import Categories from '../models/categories.js';

export async function getAllCategories(req, res, next) {
	return Categories.findAll();
}
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

/**
 * The `categories` model.
 * Represents a professional category (e.g. Alimentation, Bâtiment...).
 * A category has many specialites (see specialites.js for the association).
 */
const Categories = sequelize.define('categories', {
	/**
	 * Unique identifier of the category.
	 */
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	/**
	 * Name of the category. Must be unique.
	 */
	nom: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	},
	slug: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	}
}, { tableName: 'categories', freezeTableName: true, timestamps: false });

export default Categories;

import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';
import Categories from './categories.js';

/**
 * The `specialites` model.
 * Represents a specialty (e.g. Plombier, Menuisier...).
 * A specialty belongs to one category and has many artisans
 * (see the associations declared below).
 */
const Specialites = sequelize.define('specialites', {
	/**
	 * Unique identifier of the specialty.
	 */
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	/**
	 * Name of the specialty. Must be unique.
	 */
	nom: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	}
}, { tableName: 'specialites', freezeTableName: true, timestamps: false }
);

/**
 * Associations between the models.
 * - A category has many specialties.
 * - A specialty belongs to one category.
 * Both sides use the same foreign key `categories_id` so that
 * queries with `include` work in either direction.
 */
Categories.hasMany(Specialites, { foreignKey: 'categories_id' });
Specialites.belongsTo(Categories, {
	foreignKey: {
		name: 'categories_id',
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
	},
	onDelete: 'RESTRICT',
});


export default Specialites;

import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';
import Specialites from './specialites.js';

/**
 * The `artisans` model.
 * Represents a craftsman registered on the platform.
 * An artisan belongs to one specialty (see the associations below).
 */
const Artisans = sequelize.define('artisans', {
	/**
	 * Unique identifier of the artisan.
	 */
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	/**
	 * Name of the artisan or of his business.
	 */
	nom: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	/**
	 * Average rating of the artisan, between 0 and 5 (one decimal).
	 */
	note: {
		type: DataTypes.DECIMAL(2, 1),
		allowNull: false,
	},
	/**
	 * City where the artisan operates.
	 */
	ville: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	/**
	 * Short presentation of the artisan.
	 */
	a_propos: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	/**
	 * Contact email of the artisan. Must be unique.
	 */
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	/**
	 * Optional website of the artisan.
	 */
	site_web: {
		type: DataTypes.STRING,
	},
	/**
	 * Whether the artisan is featured in the top 3.
	 */
	est_en_top_trois: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	}
}, { tableName: 'artisans', freezeTableName: true, timestamps: false }
);

/**
 * Associations between the models.
 * - A specialty has many artisans.
 * - An artisan belongs to one specialty.
 * Both sides use the same foreign key `specialites_id`.
 */
Specialites.hasMany(Artisans, { foreignKey: 'specialites_id' });
Artisans.belongsTo(Specialites, {
	foreignKey: {
		name: 'specialites_id',
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
	},
	onDelete: 'RESTRICT',
});


export default Artisans;

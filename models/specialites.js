import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';
import Categories from './categories.js';

const Specialites = sequelize.define('specialites', {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	nom: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	}
}, { tableName: 'specialites', freezeTableName: true }
);

// "categories_id" INTEGER NOT NULL REFERENCES "categories" ("id") ON DELETE RESTRICT
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
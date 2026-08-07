import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

const Categories = sequelize.define('categories', {
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
}, { tableName: 'categories', freezeTableName: true });

export default Categories;
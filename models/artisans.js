import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';
import Specialites from './specialites.js';

const Artisans = sequelize.define('artisans', {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	nom: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	note: {
		type: DataTypes.DECIMAL(2, 1),
		allowNull: false,
	},
	ville: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	a_propos: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	site_web: {
		type: DataTypes.STRING,
	},
	est_en_top_trois: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	}
}, { tableName: 'artisans', freezeTableName: true }
);

// "specialites_id" INTEGER NOT NULL REFERENCES "specialites" ("id") ON DELETE RESTRICT
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
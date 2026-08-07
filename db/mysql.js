import { Sequelize } from 'sequelize';

const clientOptions = {
	hostname: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
};

// Passing parameters separately (other dialects)
export const sequelize = new Sequelize(clientOptions.dbName, clientOptions.username, clientOptions.password, {
	host: clientOptions.hostname,
	dialect: 'mysql'
});

export const initClientDbConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		if (process.env.NODE_ENV !== 'production') {
			await sequelize.sync();
		}
	} catch (error) {
		console.error('Unable to connect to the database:', error);
		throw error;
	}
};
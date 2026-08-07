import { Sequelize } from 'sequelize';

/**
 * Database connection options read from environment variables.
 * All values come from the env files located in the `env/` folder.
 */
const clientOptions = {
	hostname: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dbName: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
};

/**
 * The main Sequelize instance of the application.
 * It is a connection pool: it should stay alive for the whole life
 * of the process and must NOT be closed after each request.
 * @type {import('sequelize').Sequelize}
 */
export const sequelize = new Sequelize(clientOptions.dbName, clientOptions.username, clientOptions.password, {
	host: clientOptions.hostname,
	port: clientOptions.port || undefined,
	dialect: 'mysql'
});

/**
 * Opens a connection to the database and synchronizes the models.
 * In non-production environments, `sequelize.sync()` creates the tables
 * that do not exist yet. In production, the schema must be managed
 * manually (e.g. with schema.sql or migrations).
 * @returns {Promise<void>} Resolves when the connection is established.
 * @throws {Error} If the connection could not be established.
 */
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

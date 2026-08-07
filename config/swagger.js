import swaggerJSDoc from 'swagger-jsdoc';

/**
 * Swagger options passed to swagger-jsdoc.
 * The OpenAPI base definition is declared here, while each route
 * documents itself with JSDoc @swagger tags (see the routes folder).
 */
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Trouve ton artisan API',
			version: '1.0.0',
			description: 'API Express to connect homeowners with craftsmen from the Auvergne-Rhône-Alpes region.',
		},
		servers: [
			{
				url: 'http://127.0.0.1:3000',
				description: 'Local development server',
			},
		],
		components: {
			schemas: {
				Category: {
					type: 'object',
					properties: {
						id: { type: 'integer' },
						nom: { type: 'string', example: 'Bâtiment' },
					},
				},
				Specialite: {
					type: 'object',
					properties: {
						id: { type: 'integer' },
						nom: { type: 'string', example: 'Plombier' },
						categories_id: { type: 'integer' },
					},
				},
				Artisan: {
					type: 'object',
					properties: {
						id: { type: 'integer' },
						nom: { type: 'string', example: 'Vallis Bellemare' },
						note: { type: 'number', format: 'float', example: 4.0 },
						ville: { type: 'string', example: 'Vienne' },
						a_propos: { type: 'string' },
						email: { type: 'string', format: 'email' },
						site_web: { type: 'string', nullable: true },
						est_en_top_trois: { type: 'boolean', example: false },
						specialites_id: { type: 'integer' },
					},
				},
				ContactForm: {
					type: 'object',
					required: ['nom', 'email', 'objet', 'message'],
					properties: {
						nom: { type: 'string', example: 'Jeanne Dupont' },
						email: { type: 'string', format: 'email', example: 'jeanne.dupont@mail.fr' },
						objet: { type: 'string', example: 'Devis plomberie' },
						message: { type: 'string', example: 'Bonjour, j\'aimerais un devis...' },
					},
				},
				Error: {
					type: 'object',
					properties: {
						error: { type: 'integer' },
						message: { type: 'string' },
					},
				},
			},
		},
	},
	apis: ['./routes/*.js'],
};

/** The generated OpenAPI specification object, served by swagger-ui-express. */
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;

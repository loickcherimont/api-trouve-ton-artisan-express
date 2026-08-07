import nodemailer from 'nodemailer';

/**
 * Lazily created Ethereal transporter.
 * Ethereal is a fake SMTP service for development: emails are not delivered
 * but can be previewed in a browser using the URL returned by
 * `nodemailer.getTestMessageUrl`. This requires no real SMTP credentials.
 *
 * @type {Promise<import('nodemailer').Transporter>|null}
 */
let transporterPromise = null;

/**
 * Returns the shared Ethereal transporter, creating it on first use.
 * @returns {Promise<import('nodemailer').Transporter>} The transporter.
 */
async function getTransporter() {
	if (!transporterPromise) {
		transporterPromise = (async () => {
			const testAccount = await nodemailer.createTestAccount();

			return nodemailer.createTransport({
				host: testAccount.smtp.host,
				port: testAccount.smtp.port,
				secure: testAccount.smtp.secure,
				auth: {
					user: testAccount.user,
					pass: testAccount.pass,
				},
			});
		})();
	}

	return transporterPromise;
}

/**
 * Sends a contact form email to the artisan.
 * The reply goes to the requester so the artisan can answer directly.
 *
 * @param {Object} payload - The contact form data.
 * @param {string} payload.nom - Name of the requester.
 * @param {string} payload.email - Email of the requester (used as replyTo).
 * @param {string} payload.objet - Subject of the message.
 * @param {string} payload.message - Body of the message.
 * @param {string} payload.to - Email address of the artisan.
 * @returns {Promise<string>} The Ethereal preview URL of the sent message.
 */
export async function sendContactEmail({ nom, email, objet, message, to }) {
	const transporter = await getTransporter();

	const info = await transporter.sendMail({
		from: `"Trouve ton artisan" <${email}>`,
		replyTo: email,
		to,
		subject: objet,
		text: `Message de ${nom} (${email})\n\n${message}`,
		html: `
			<p>Message de <strong>${nom}</strong> (<a href="mailto:${email}">${email}</a>)</p>
			<p>${message}</p>
		`,
	});

	return nodemailer.getTestMessageUrl(info);
}

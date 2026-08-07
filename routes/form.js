import express from 'express';
import { allFieldsAreCompleted, cleanUserContactInfos, secureAllFields, isValidEmail, sendMessageTo } from '../services/form.js';

const router = express.Router();

/**
 * POST /api/contact
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit the contact form.
 *     description: Validates, cleans and secures the contact form before returning a confirmation message.
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactForm'
 *     responses:
 *       200:
 *         description: The form was accepted, a confirmation message is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Merci pour votre message. Vous recevrez une réponse sous 48h.
 *                 previewUrl:
 *                   type: string
 *                   example: https://ethereal.email/message/xxxx
 *       400:
 *         description: Missing field or invalid email address.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', async (req, res, next) => {
	try {
		const securedUserInfos = secureAllFields(cleanUserContactInfos(req.body));

		if (!allFieldsAreCompleted(securedUserInfos)) {
			return res.status(400).json({ message: 'Tous les champs sont requis.' });
		}

		if (!isValidEmail(securedUserInfos.email)) {
			return res.status(400).json({ message: 'Adresse email invalide.' });
		}

		if (!isValidEmail(securedUserInfos.to)) {
			return res.status(400).json({ message: 'Adresse email de l\'artisan invalide.' });
		}

		const previewUrl = await sendMessageTo(securedUserInfos);
		return res.status(200).json({
			message: 'Merci pour votre message. Vous recevrez une réponse sous 48h.',
			previewUrl,
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
});

export default router;

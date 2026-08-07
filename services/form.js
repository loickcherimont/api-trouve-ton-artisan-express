/**
 * Checks that every field of the given object has a non-empty value.
 * @param {Object} fields - The fields to validate.
 * @returns {boolean} True if all fields are filled, false otherwise.
 */
export function allFieldsAreCompleted(fields) {
	for (const field in fields) {
		if (fields[field] === null || fields[field] === undefined || fields[field] === '') return false;
	}
	return true;
}

/**
 * Trims every field of the contact form and lowercases the email.
 * Missing fields are normalized to an empty string to avoid crashes.
 * @param {Object} userContactInfos - The raw contact form data.
 * @returns {{nom: string, email: string, objet: string, message: string}} The cleaned data.
 */
export function cleanUserContactInfos(userContactInfos) {
	return {
		nom: userContactInfos.nom?.trim() ?? '',
		email: userContactInfos.email?.trim().toLowerCase() ?? '',
		objet: userContactInfos.objet?.trim() ?? '',
		message: userContactInfos.message?.trim() ?? '',
	}
}

/**
 * Escapes a string so that it is safe to be displayed as HTML.
 * Prevents stored XSS attacks.
 * @param {*} value - The value to escape.
 * @returns {string} The escaped string.
 */
function escapeHtml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * Applies HTML escaping to every field of the contact form.
 * @param {Object} fields - The cleaned contact form data.
 * @returns {{nom: string, email: string, objet: string, message: string}} The secured data.
 */
export function secureAllFields(fields) {
	return {
		nom: escapeHtml(fields.nom),
		email: escapeHtml(fields.email),
		objet: escapeHtml(fields.objet),
		message: escapeHtml(fields.message),
	}
}

/**
 * Checks that an email address has a valid basic format.
 * @param {string} email - The email address to test.
 * @returns {boolean} True if the format is valid, false otherwise.
 */
export function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const { LANGUAGES, HEADER, DEFAULT_LANGUAGE } = require('./../util/constant');

let defaults = (req, res, next) => {

	// Get language
	let language = req.headers[HEADER.LANGUAGE];
	if (!language || !LANGUAGES.includes(language)) {
		language = DEFAULT_LANGUAGE;
	}

	// Set language
	req.language = language;

	// next
	return next();

};

// Export
module.exports = defaults;
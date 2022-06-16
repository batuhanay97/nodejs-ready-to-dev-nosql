const { ERROR, RESPONSE_STATUS, RESPONSE_TYPE } = require('./../util/constant');
const logger = require('../util/logger');

let result = (result, req, res, next) => {

	// console.log(result);

	// If headers set before skip
    if (res.headersSent) {
		logger.error("Internal server error. Error: Headers sent.");
		return res.status(500).send({
			code: ERROR.INTERNAL_SERVER_ERROR.code,
			message: ERROR.INTERNAL_SERVER_ERROR.message[req.language]
		});
	} else if (!result) { // The result didn't come for any reason
		logger.error("Internal server error. Error: " + result);
		return res.status(500).send({
			code: ERROR.INTERNAL_SERVER_ERROR.code,
			message: ERROR.INTERNAL_SERVER_ERROR.message[req.language]
		});
	}

	const data = result.data;

	// SUCCESS

	// Was it a successful process?
	if (result.status === RESPONSE_STATUS.SUCCESS) {

		// Set headers if exists
		//if (result.headers) {res.header(result.headers)};

		// Download if it is a file
		if (result.type === RESPONSE_TYPE.FILE) {
			return res.download(data.data, data.fileName, (err) => {
				if (err) logger.error(JSON.stringify(err, null, 2));
				else logger.info(JSON.stringify(result, null, 2));
			});
		}

		// Log warning
		logger.info(JSON.stringify(result, null, 2));

		// Return success
		return res.status(200).send(data);

	}

	// ERROR

	// Is there error object?
    if (data) {

		// Find the error
		const err = Object.values(ERROR).find(item => item.code === data.code);
		let returnObject;

		// Known error
		if (err) returnObject = { code: err.code, message: err.message[req.language] }
		// Unknown error
		else returnObject = { code: ERROR.UNKNOWN.code, message: ERROR.UNKNOWN.message[req.language] }

		// Log warning
		logger.warn((result.data.stack ? result.data.stack : '') + '\n' + JSON.stringify(returnObject, null, 2));

		// Error
		return res.status(400).send(returnObject);

    } else {

		// Unknown error
		let returnObject = { code: ERROR.INTERNAL_SERVER_ERROR.code, message: ERROR.INTERNAL_SERVER_ERROR.message[req.language] };

		// Log error
		logger.error(result.stack + '\n' + JSON.stringify(returnObject, null, 2));

		// Multer error
		if (result && result.code === 'LIMIT_FILE_SIZE')
			return res.status(400).send({ code: ERROR.IMAGE_TOO_LARGE.code, message: ERROR.IMAGE_TOO_LARGE.message[req.language] });
		// Multer error
		if (result && result.code === 'LIMIT_UNEXPECTED_FILE')
			return res.status(400).send({ code: ERROR.INCORRECT_FIELD_NAME.code, message: ERROR.INCORRECT_FIELD_NAME.message[req.language] });
        // Unknown error
		else
			return res.status(500).send(returnObject);

	}

};

// Export
module.exports = { result };

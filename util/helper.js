
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

const validator = require('validator');
const bcrypt = require('bcryptjs');
const { CONSTANT, ERROR, LIMIT } = require('./constant');
const passwordValidator = require('password-validator');

const defineRoutes = (routes, routeName, version) => {

    // Define router
    const router = require('express').Router();

    // Create all routes
    routes.forEach((endpoint) => {

        // Set version if endpoint doesn't support
        if (!endpoint.versions.includes(version)) version = endpoint.fallbackVersion;

        // Set handlers
        let handlers = [];
        if (endpoint.authentication) handlers.push(authentication);
        if (endpoint.authorization) handlers.push(authorization(endpoint.authorization));
        handlers = handlers.concat(endpoint.handlers);

        // Set controller
        router[endpoint.type](endpoint.path, handlers,
            require(`./../controllers/${version}/${routeName}/${endpoint.controller}`));

    });

    // Return router
    return router;

};

const checkFields = (fields) => {

    let response = {};

    // Name
    if (fields.hasOwnProperty('name')) {
        if (!fields.name || typeof fields.name !== 'string') {
            return { error: ERROR.NAME_MISSING };
        }
        else response.name = fields.name.trim();
    }

    // Surname
    if (fields.hasOwnProperty('surname')) {
        if (!fields.surname || typeof fields.surname !== 'string') {
            return { error: ERROR.SURNAME_MISSING };
        }
        else response.surname = fields.surname.trim();
    }

    // Email
    if (fields.hasOwnProperty('email')) {
        if (!fields.email || typeof fields.email !== 'string' || !validator.isEmail(fields.email.trim())) {
            return { error: ERROR.BADLY_FORMATTED_EMAIL };
        }
        else response.email = fields.email.trim();
    }

    // Password
    if (fields.hasOwnProperty('password')) {
        if (!fields.password || typeof fields.password !== 'string') {
            return { error: ERROR.INVALID_PASSWORD };
        }
        else {

            // Create a schema
            let schema = new passwordValidator();

            // Customize password schema
            schema
                .is().min(LIMIT.MIN_PASSWORD_CHAR_COUNT)
                .is().max(LIMIT.MAX_PASSWORD_CHAR_COUNT)
                .has().lowercase()
                .has().digits();

            // Get validity
            const check = schema.validate(fields.password);

            // Return error if check is not valid
            if (!check) return { error: ERROR.INVALID_PASSWORD };

            response.password = bcrypt.hashSync(fields.password, bcrypt.genSaltSync(CONSTANT.HASH_SALT));
            response.plainPassword = fields.password;

        }
    }

    // Phone
    if (fields.hasOwnProperty('phone')) {
        if (!fields.phone || !validator.isMobilePhone(fields.phone.trim())) {
            return { error: ERROR.PHONE_MISSING };
        }
        else response.phone = fields.phone.trim();
    }

    // Username
    if (fields.hasOwnProperty('username')) {
        if (!fields.username || typeof fields.name !== 'string') {
            return { error: ERROR.USERNAME_MISSING };
        }
        else response.username = fields.username.trim();
    }

    // Return response
    return response;

};

module.exports= {
    defineRoutes,
    checkFields
};

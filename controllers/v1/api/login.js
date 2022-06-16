const { RESPONSE_STATUS, ERROR, HEADER } = require('../../../util/constant');
const User = require('../../../model/user');
const UserToken = require('../../../model/userToken');
const { checkFields } = require('./../../../util/helper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    let { email, password } = req.body;
    let returnObject;

    // Check fields
    let createObject = checkFields({ email, password });

    // Field validation failed
    if (createObject.error) {
        return next({
            data: createObject.error,
            message: `Failed while creating user`,
            status: RESPONSE_STATUS.FAIL
        });
    }

    return User.findOne({email})
        .then(user => {

            if(!user) return Promise.reject(ERROR.USER_NOT_FOUND);

            // Incorrect credentials
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return Promise.reject(ERROR.INCORRECT_CREDENTIALS);
            }
            // Correct credentials
            else {

                // Create token
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET).toString();

                returnObject = {
                    user,
                    token
                };

                // Save token
                return UserToken.create({ token, user: user._id });

            }
        })
        // Success
        .then(token => next({
			data: returnObject,
			//headers: { [HEADER.AUTHENTICATION]: token },
            message: `Successful login by id: ${returnObject._id} `,
            status: RESPONSE_STATUS.SUCCESS
        }))
		// Fail
        .catch(error => next({
			data: error,
            message: `Login failed by the user with email: ${req.body.email}.`,
			status: RESPONSE_STATUS.FAIL
        }));

};

/**
 * @swagger
 * definition:
 *   login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     example: {
 *       "email": "dummyemail@test.com",
 *       "password": "dummy-password0",
 *     }
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: login
 *         in: body
 *         schema:
 *           $ref: '#/definitions/login'
 *     responses:
 *       200:
 *         headers:
 *           x-auth:
 *             schema:
 *               type: string
 *             description: Authentication token
 *         schema:
 *           type: object
 *           $ref: '#/definitions/user'
 *       400:
 *         description: Code = 1007, 1008, 3000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 *       401:
 *         description: Code = 1000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 *       500:
 *         description: Code = 4000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 */
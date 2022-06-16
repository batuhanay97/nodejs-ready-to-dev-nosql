const { RESPONSE_STATUS, ERROR, USER_TYPE } = require('../../../util/constant');
const User = require('../../../model/user');
const { checkFields } = require('./../../../util/helper');

module.exports = (req, res, next) => {

    let { name, surname, email, password, username } = req.body;

    // Check fields
    let createObject = checkFields({ name, surname, email, password, username });

    // Field validation failed
    if (createObject.error) {
        return next({
            data: createObject.error,
            message: `Failed while creating user`,
            status: RESPONSE_STATUS.FAIL
        });
    }

    return User.findOne({ email })
        .then(user => {

            if(user) return Promise.reject(ERROR.USER_ALREADY_EXIST);

            return User.create({ ...createObject });

        })
        // Success
        .then(user => next({
            data: user,
            message: `User created with id: ${user.id}`,
            status: RESPONSE_STATUS.SUCCESS
        }))
        // Fail
        .catch(error => next({
            data: error,
            message: `User could not be created`,
            status: RESPONSE_STATUS.FAIL
        }));

};

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - User
 *     description: Signup
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Signup
 *         in: body
 *         schema:
 *           $ref: '#/definitions/signUpUser'
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
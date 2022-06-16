const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const constants = require('../../util/constant');
const User = require('../../model/user');
const UserToken = require('../../model/userToken');

const users = [{
    id: uuidv4(),
    email: 'hasan@gmail.com',
    passwordPlain: 'password0',
    password: bcrypt.hashSync('password0', bcrypt.genSaltSync(constants.CONSTANT.HASH_SALT)),
    name: 'Hasan',
    surname: 'Yan',
    type: constants.USER_TYPE.OPERATOR,
    username: 'dummyUsername',
    phone: 5315558899
}];

const userTokens = [{
    token: jwt.sign(_.pick(users[0], ['id']), process.env.JWT_SECRET).toString(),
    userId: users[0].id,
    createdAt: moment().subtract(constants.EXPIRATION.TOKEN_IN_DATABASE + 1, 'days')
}];

const populateTables = () => {
    User.insertMany(users)
        .then(() => UserToken.insertMany(userTokens))
};

module.exports = {
    populateTables,
    users,
    userTokens
};
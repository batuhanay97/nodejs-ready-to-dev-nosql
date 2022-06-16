
const User = require('../../model/user');
const UserToken = require('../../model/userToken');
const resetDb = () => {
    return Promise.resolve()
        .then(() => User.deleteMany({}))
        .then(() => UserToken.deleteMany({}))
        .catch(err => console.log(err))
};

module.exports = {
    resetDb
};
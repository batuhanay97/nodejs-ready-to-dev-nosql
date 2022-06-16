const { defineRoutes } = require('./../util/helper');
const { USER_TYPE } = require('./../util/constant');

// Define routes
const routes = [{
    controller: 'signup',
    description: 'signup',
    fallbackVersion: 'v1',
    handlers: [],
    path: '/signup',
    authentication: false,
    authorization: null,
    type: 'post',
    versions: ['v1']
}, {
    controller: 'login',
    description: 'Login',
    fallbackVersion: 'v1',
    handlers: [],
    path: '/login',
    userAuthentication: false,
    authorization: null,
    type: 'post',
    versions: ['v1']
}];

// Export route
module.exports = (version) => defineRoutes(routes, 'api', version);


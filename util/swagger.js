const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { HEADER } = require('./constant');

// swagger definition
const swaggerDefinition = {
    info: {
        title: 'Senfonico-Avm-Api',
        version: '1.0.0',
        description: 'Senfonico Swagger',
    },
    host: process.env.API_URL.replace('http://', '').replace('https://', ''),
    basePath: '/',
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            description: 'JWT authorization token',
            name: HEADER.AUTHENTICATION,
            in: 'header',
        }
    },
    security: [
        { jwt: [] }
    ]
};

// Options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./controllers/*/*/*.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {

    // Swagger.json get
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    // Initialize ui
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}

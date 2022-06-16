const { AVAILABLE_VERSIONS, HEADER, ENVIRONMENT, TIMEOUT } = require('./util/constant');

// Get environment configuration if not in production
if (process.env.NODE_ENV !== ENVIRONMENT.PRODUCTION) require('./config/config.js');
// Connect to db
require('./db/connectDb');
// Init helper functions
require('./util/helper');

const express = require('express');
const bodyParser = require('body-parser');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');
const cors = require('cors');
const initializeSwagger = require('./util/swagger');
const routes = require('./route');
const middlewareDefaults = require('./middleware/defaults');
const { result } = require('./middleware/result');

const app = express();

// App middleware
app.use(cors({
    exposedHeaders: [Object.values(HEADER)]
}));
app.enable("trust proxy");
app.use(helmet());
app.use(bodyParser.json());
app.use(boolParser());

// Initialize swagger
initializeSwagger(app);

// Middleware defaults
app.use(middlewareDefaults);

// Define routes
Object.keys(routes).forEach(key => {
    // Versioning
    AVAILABLE_VERSIONS.forEach(version => {
        app.use(`/api/${version}/` + key, routes[key](version));
    });
});

// Result handler
app.use(result);

// Start server
const server = app.listen(process.env.PORT, () => {
    console.log(`App started on port ${process.env.PORT}`);
});

// Set timeout for all requests
server.setTimeout(TIMEOUT.REQUEST);

// Export for testing
module.exports = { app };

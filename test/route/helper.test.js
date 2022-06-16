const fs = require('fs');
const testConfig = require('./../../config/test.config');

describe('HELPER', () => {

    const filterTests = testConfig.functionFilter.map(item => item + '.js');

    // Read each test file for v1
    fs
        .readdirSync(__dirname + '/../helper')
        .forEach(file => {
            if (filterTests.length === 0 || filterTests.includes(file))
                require(__dirname + '/../helper/' + file)();
        });

});
'user strict';

module.exports = function () {
    var fs = require('fs');
    var path = require('path');

    var logs = browser.driver.manage().logs();

    var spec = jasmine.getEnv().currentSpec;
    var specName = spec.suite.description.replace(/\s|\//g, '_') + '-' + spec.description.replace(/\s|\//g, '_');
    console.log(__dirname);
    console.log(specName);

    var logsDir = path.resolve(__dirname + '/../logs');
    if(!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    logs.getAvailableLogTypes().then(function(logTypes) {
        console.log(logTypes);
        if(logTypes === 'browser') {

        }
    });

};

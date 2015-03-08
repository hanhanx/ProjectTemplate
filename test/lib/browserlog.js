'user strict';

module.exports = function () {
    var fs = require('fs');
    var path = require('path');

    var logs = browser.driver.manage().logs();
    var logType = 'browser';

    var spec = jasmine.getEnv().currentSpec;
    var specName = spec.suite.description.replace(/\s|\//g, '_') + '-' + spec.description.replace(/\s|\//g, '_');

    var logsDir = path.resolve(__dirname + '/../logs');
    if(!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    logs.getAvailableLogTypes().then(function(logTypes) {
        if(logTypes.indexOf(logType) > -1) {
            var logFileName = path.resolve(logsDir + '/' + specName + '.txt');
            browser.driver.manage().logs().get(logType).then(function (logEntries) {
                if(fs.existsSync(logFileName)) {
                    fs.unlinkSync(logFileName);
                }

                var len = logEntries.length;
                console.log('Writing file ' + logFileName + ": " + len);
                for(var i = 0; i < len; i++) {
                    var logEntry = logEntries[i];
                    var msg = new Date(logEntry.timestamp) + '  ' + logEntry.type + '  ' + logEntry.message;
                    fs.appendFileSync(logFileName, msg, {encoding: 'utf8'}, function(e) {
                        console.log(e);
                    });
                }
            });
        }
    });

};

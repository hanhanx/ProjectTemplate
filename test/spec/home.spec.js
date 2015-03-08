'use strict';

var bwlog = require('../lib/browserlog.js');
describe('test homepage', function() {
    beforeEach(function() {
        browser.get('http://localhost:9000/');
    });
    it('logging', function() {
        browser.waitForAngular();
    });

    afterEach(function() {
        bwlog();
    });
});
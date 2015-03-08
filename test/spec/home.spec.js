'use strict';

var bwlog = require('../lib/browserlog.js');
ddescribe('test homepage', function() {
    beforeEach(function() {
        browser.get('http://localhost:9000/');
    });
    it('logging', function() {
        browser.waitForAngular();
        expect(element(by.css('.jumbotron')).isPresent()).toBe(true);

        element(by.cssContainingText('.header>ul>li>a', 'About')).click();
        expect(element(by.cssContainingText('div>p', 'This is the about view.')).isPresent()).toBe(true);

        element(by.cssContainingText('.header>ul>li>a', 'Contact')).click();
        expect(element(by.css('[ng-view]')).isPresent()).toBe(false);

        element(by.cssContainingText('.header>ul>li>a', 'Home')).click();
        expect(element(by.css('.jumbotron')).isPresent()).toBe(true);
    });

    afterEach(function() {
        bwlog();
    });
});
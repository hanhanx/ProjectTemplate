'use strict';
angular.module('init-mock', [])
    .run(function() {
        jasmine.getJSONFixtures().fixturesPath = 'base/src/mock/';
        var mock = getJSONFixture('test.json');
        console.log(mock);
    });
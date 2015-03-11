describe('App', function () {
    beforeEach(module('templates-app'));
    beforeEach(module('init-mock'));
    beforeEach(module('pp.app'));
    beforeEach(inject(function($httpBackend) {
        $httpBackend.expectGET('about').respond(200);
    }));
    it('routing about', inject(function($route, $location, $rootScope) {
        $location.path('/about');
        $rootScope.$digest();
        expect($route.current.controller).toBe('AboutCtrl');
    }));

    it('routing main', inject(function($route, $location, $rootScope) {
        $location.path('/blahblahblah');
        $rootScope.$digest();
        expect($route.current.controller).toBe('MainCtrl');
    }));

});
xdescribe('Controller: AboutCtrl', function () {

    beforeEach(module('letusgoApp'));

    var AboutCtrl,
        scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AboutCtrl = $controller('AboutCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });

});

'use strict';
describe('test main :', function () {

    beforeEach(module('letusgoApp'));

    var $scope, $controller, creatMainCtrl;

    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $controller = $injector.get('$controller');

        creatMainCtrl = function () {

            return $controller('MainCtrl', {
                $scope: $scope
            });
        }
    }));

    describe('to-parent-navigator-inmain function', function () {
        beforeEach(function () {
            spyOn($scope, "$emit");
            creatMainCtrl();

        });
        it('should work', function () {
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-inmain');
        });
    });
});

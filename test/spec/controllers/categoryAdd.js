describe('test categoryAdd:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, categoryAddService, $controller, creatCategoryAddCtrl;
    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        categoryAddService = $injector.get('categoryAddService');

        $controller = $injector.get('$controller');

        creatCategoryAddCtrl = function () {

            return $controller('CategoryAddCtrl', {
                $scope: $scope,
                $location: $location,
                categoryAddService: categoryAddService
            });
        }
    }));

    describe('test saveButton:', function () {

        beforeEach(function () {
            creatCategoryAddCtrl();
        });
        it('saveButton is ok', function () {
            spyOn(categoryAddService, 'saveButton');
            $scope.saveButton();
            expect(categoryAddService.saveButton).toHaveBeenCalledWith($scope.currentID, $scope.currentName);
        });
    });

    describe('test cancel:', function () {

        beforeEach(function () {
            creatCategoryAddCtrl();
        });
        it('cancel is ok', function () {
            spyOn($location, 'path');
            $scope.cancel();
            expect($location.path).toHaveBeenCalledWith('/categoryManage');
        });
    });

});

xdescribe('test categoryAdd:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, CategoryService, $controller, creatCategoryAddCtrl;
    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        CategoryService = $injector.get('CategoryService');

        $controller = $injector.get('$controller');

        creatCategoryAddCtrl = function () {

            return $controller('CategoryAddCtrl', {
                $scope: $scope,
                $location: $location,
                CategoryService: CategoryService
            });
        }
    }));

    describe('test saveButton:', function () {

        beforeEach(function () {
            creatCategoryAddCtrl();
        });
        it('saveButton is ok', function () {
            spyOn(CategoryService, 'saveButton');
            $scope.saveButton();
            expect(CategoryService.saveButton).toHaveBeenCalledWith($scope.currentID, $scope.currentName);
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

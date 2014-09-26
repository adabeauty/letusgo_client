describe('test categoryAdd:', function () {

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

    describe('saveButton:', function () {

        beforeEach(function () {
            creatCategoryAddCtrl();
            spyOn(CategoryService, 'saveButton');
            $scope.saveButton();
        });
        it('should work', function () {
            expect(CategoryService.saveButton).toHaveBeenCalledWith($scope.currentName);
        });
    });

    describe('test cancel:', function () {

        beforeEach(function () {
            creatCategoryAddCtrl();
            spyOn($location, 'path');
            $scope.cancel();
        });
        it('cancel is ok', function () {
            expect($location.path).toHaveBeenCalledWith('/categoryManage');
        });
    });

});

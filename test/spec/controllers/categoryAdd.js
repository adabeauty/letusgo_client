describe('test categoryAdd:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, categoryManageService, $controller, creatCategoryAddCtrl;
    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        categoryManageService = $injector.get('categoryManageService');

        $controller = $injector.get('$controller');

        creatCategoryAddCtrl = function () {

            return $controller('CategoryAddCtrl', {
                $scope: $scope,
                $location: $location,
                categoryManageService: categoryManageService
            });
        }
    }));

    describe('test saveButton:', function () {

        beforeEach(function () {
            creatCategoryAddCtrl();
        });
        it('saveButton is ok', function () {
            spyOn(categoryManageService, 'saveButton');
            $scope.saveButton();
            expect(categoryManageService.saveButton).toHaveBeenCalledWith($scope.currentID, $scope.currentName);
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

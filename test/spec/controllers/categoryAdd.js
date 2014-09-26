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
            var result = [false, true];
            var currentName;
            creatCategoryAddCtrl();
            spyOn(CategoryService, 'saveNewCategory').and.callFake(function(currentName, callback){
                callback(result);
            });
            $scope.saveNewCategory();
        });
        it('should work', function () {
            CategoryService.saveNewCategory($scope.currentName, function(warnig){
                expect($scope.undefinedCategory).toEqual(false);
                expect($scope.repeatedCategory).toEqual(true);
            });
            expect(CategoryService.saveNewCategory).toHaveBeenCalled();
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

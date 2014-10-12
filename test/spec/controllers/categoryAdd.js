ddescribe('test categoryAdd:', function () {

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

        it('should not skip', function () {
            var result = [false, true];
            var currentName = 'fruit';

            creatCategoryAddCtrl();
            spyOn(CategoryService, 'saveNewCategory').and.callFake(function(currentName, callback){
                callback(result);
            });
            $scope.saveNewCategory();

            CategoryService.saveNewCategory($scope.currentName, function(warnig){
                expect($scope.undefinedCategory).toEqual(false);
                expect($scope.repeatedCategory).toEqual(true);
            });
            expect(CategoryService.saveNewCategory).toHaveBeenCalled();
        });
        it('should skip to another view', function () {
            var result = [false, false];
            var currentName = 'fruit';

            creatCategoryAddCtrl();
            spyOn(CategoryService, 'saveNewCategory').and.callFake(function(currentName, callback){
                callback(result);
            });
            spyOn($location, 'path');
            $scope.saveNewCategory();

            CategoryService.saveNewCategory($scope.currentName, function(warnig){
                expect($scope.undefinedCategory).toEqual(false);
                expect($scope.repeatedCategory).toEqual(false);
                expect($location.path).toHaveBeenCalledWith('/categoryManage');
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

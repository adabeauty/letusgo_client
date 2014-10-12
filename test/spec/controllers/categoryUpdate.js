'use strict';
describe('test categoryUpdate', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, localStorageService, CategoryService, $controller, creatCategoryUpdateCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
        CategoryService = $injector.get('CategoryService');

        $controller = $injector.get('$controller');
        creatCategoryUpdateCtrl = function () {
            return $controller('CategoryUpdateCtrl', {
                $scope: $scope,
                $location: $location,
                localStorageService: localStorageService,
                CategoryService: CategoryService
            });
        }
    }));

    beforeEach(function () {
        spyOn(localStorageService, 'get');
        creatCategoryUpdateCtrl();
    });

    describe('$scope.updateObject', function () {

        it('should get value', function () {
            expect(localStorageService.get).toHaveBeenCalledWith('updateCategory');
        });
    });

    describe('updateCategory', function () {
        beforeEach(function () {
            spyOn(localStorageService, 'set');
            spyOn(CategoryService, 'updateCategory').and.callFake(function(callback){
                callback();
            });
            spyOn($location, 'path');

            $scope.updateCategory();
        });
        it('should work', function () {
            CategoryService.updateCategory(function(){
                expect($location.path).toHaveBeenCalledWith('/categoryManage');
            });
            expect(localStorageService.set).toHaveBeenCalledWith('updateCategory', $scope.updateObject);
            expect(CategoryService.updateCategory).toHaveBeenCalled();
        });
    });

    describe('cancel', function () {
        beforeEach(function () {
            spyOn($location, 'path');
            $scope.cancel();
        });
        it('should work', function () {
            expect($location.path).toHaveBeenCalledWith('/categoryManage');
        });
    });
});

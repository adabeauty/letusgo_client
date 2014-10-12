'use strict';
describe('test: CategoryService:', function () {

    beforeEach(module('letusgoApp'));
    var CategoryService, localStorageService, $http, $httpBackend, $location;
    beforeEach(inject(function ($injector) {

        CategoryService = $injector.get('CategoryService');
        localStorageService = $injector.get('localStorageService');
        $location = $injector.get('$location');
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
    }));

    describe('nameHasExist', function () {

        var categories = [{ID:'1', name:'饮料类', num: 3}];
        it('of exsit name should return index', function () {
            var existResult = CategoryService.nameHadExist(categories, '饮料类');
            expect(existResult).toBe(0);
        });
        it('of unexist name should return -1', function () {
            var existResult = CategoryService.nameHadExist(categories, '家电类');
            expect(existResult).toBe(-1);
        });
    });

    describe('saveNewCategory', function () {

        var currentCategories, currentID, currentName, callback;
        beforeEach(function () {
            currentID = 'TF1004';
            currentName = '家电类';
            currentCategories = [
                {ID: 'TF1001', name: '饮料类', num: 3},
                {ID: 'TF1002', name: '干果类', num: 0}
            ];
            callback = jasmine.createSpy('callback');
            $httpBackend.when('GET', '/api/categories').respond(currentCategories);
        });

        it('without name should return false', function () {
            spyOn(CategoryService, 'nameHadExist').and.returnValue(1);
            var result = CategoryService.saveNewCategory(currentID, callback);
            $http.get('/api/categories').success(function(categories){
                expect(result).toEqual(false);
                $httpBackend.expectGET('/api/categories');
                $httpBackend.flush();
            });
        });

        it('with existed name should return false', function () {
            spyOn(CategoryService, 'nameHadExist').and.returnValue(1);
            var result = CategoryService.saveNewCategory(currentID, callback);
            $http.get('/api/categories').success(function(categories){
                expect(result).toEqual(false);
            });
        });
        it('with correct data', function () {
            spyOn(CategoryService, 'nameHadExist').and.returnValue(-1);
            $httpBackend.when('POST', '/api/categories').respond(currentCategories);
            var result = CategoryService.saveNewCategory(currentID, callback);
            $http.get('/api/categories').success(function(categories){
                expect(CategoryService.addNewCateogory).toHaveBeenCalledWith(currentCategories, currentID, currentName);
                expect(result).toEqual(true);
                $httpBackend.expectPOST('/api/categories');
                $httpBackend.flush();
            });

        });
    });
    
    describe('updateCategory', function () {
        var updateCategory, callback;
        beforeEach(function () {
            updateCategory = {ID: 'TF1001', name: '饮料', num: 3};

            callback = jasmine.createSpy('callback');
            spyOn(localStorageService, 'get').and.returnValue(updateCategory);
            $httpBackend.when('PUT', '/api/categories/' + updateCategory.ID).respond([]);

            CategoryService.updateCategory(callback);
        });
        it('put updated category to server', function () {

            expect(localStorageService.get).toHaveBeenCalledWith('updateCategory');
            $httpBackend.expectPUT('/api/categories/' + updateCategory.ID);
            $httpBackend.flush();
        });
    });
    

    describe('deleteButton', function () {
        var deleteObject, notobject, currentCategories;
        beforeEach(function () {
            deleteObject = {ID: 'TF1002', name: '干果类', num: '0'};
            notobject = {ID: 'TF1001', name: '饮料类', num: '3'};

            currentCategories = [
                {ID: 'TF1001', name: '饮料类', num: 3},
                {ID: 'TF1002', name: '干果类', num: 0}
            ];
        });
        it('cant delete category with goods', function () {
            var result = CategoryService.deleteButton(currentCategories, notobject);
            expect(result).toEqual(false);
        });
        it('can delete category without goods', function () {
            $httpBackend.when('DELETE', '/api/categories/'+'TF1002').respond([{}, {}, {}]);
            var result = CategoryService.deleteButton(currentCategories, deleteObject);
            expect(result).toEqual(true);
            $httpBackend.expectDELETE('/api/categories/'+'TF1002');
            $httpBackend.flush();
        });
    });

});

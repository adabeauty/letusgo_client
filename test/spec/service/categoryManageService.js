'use strict';
describe('test: CategoryService:', function () {

    beforeEach(module('letusgoApp'));
    var CategoryService, localStorageService, $http, $httpBackend;
    beforeEach(inject(function ($injector) {

        CategoryService = $injector.get('CategoryService');
        localStorageService = $injector.get('localStorageService');
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
    }));

    describe('category:', function () {
        it('should return a object', function () {
            var category = CategoryService.category('TF1001', '饮料类', 3);
            expect(category.ID).toEqual('TF1001');
            expect(category.name).toEqual('饮料类');
            expect(category.num).toEqual(3);
        });
    });

    xdescribe('getCurrentId', function(){

       it('of a null array should return 1', function(){
           $httpBackend.when('GET', '/api/categories').response([]);
           var ID = CategoryService.getCurrentID();
           $httpBackend.expectGET('/api/categories');
           $httpBackend.flush();
           expect(ID).toEqual(1);
       }) ;
       it('of a array should return a new Id', function(){
           var currentCategories = {ID:'1', name:'drinks', num:'1'};
           $httpBackend.when('GET', '/api/categories').response([currentCategories]);
           var ID = CategoryService.getCurrentID();
           expect(ID).toBe(2);
       }) ;
    });
    describe('test categoryDetailSuccess', function () {

        var categoryID, categoryName;
        beforeEach(function () {
            categoryID = undefined;
            categoryName = '饮料类';
        });
        it('categoryDetailSuccess is ok', function () {
            var result = CategoryService.categoryDetailSuccess(categoryID, categoryName);
            expect(result).toEqual(undefined);
        });
    });

    describe('test nameHadExist:', function () {

        var currentNameExist, currentNameNoExist;
        beforeEach(function () {
            currentNameExist = '饮料类';
            currentNameNoExist = '家电类';

            localStorageService.set('category', currentCategories);
        });
        it('name exist', function () {
            var existResult = CategoryService.nameHadExist(currentNameExist);
            expect(existResult).toBe(0);
        });
        it('name does not exist', function () {
            var existResult = CategoryService.nameHadExist(currentNameNoExist);
            expect(existResult).toBe(-1);
        });
    });

    describe('test addNewCateogory()', function () {
        var currentID, currentName, currentCategories;

        beforeEach(function () {

            currentID = 'TF1004';
            currentName = '家电类';
            currentCategories = [
                {ID: 'TF1001', name: '饮料类', num: 3},
                {ID: 'TF1002', name: '干果类', num: 0}
            ];

            spyOn(CategoryService, 'category').and.returnValue({ID: 'TF1004', name: '家电类', num: 0});
        });

        it('category is null', function () {

            localStorageService.set('category', null);

            CategoryService.addNewCateogory(currentID, currentName);
            expect(CategoryService.category).toHaveBeenCalledWith(currentID, currentName, '0');

            var currentCategory = localStorageService.get('category');
            expect(currentCategory.length).toEqual(1);
        });
        it('category isnot null', function () {

            localStorageService.set('category', currentCategories);

            CategoryService.addNewCateogory(currentID, currentName);

            expect(CategoryService.category).toHaveBeenCalledWith(currentID, currentName, '0');

            var currentCategory = localStorageService.get('category');
            expect(currentCategory.length).toEqual(3);
        });
    });


    describe('test: saveButton()', function () {

        var currentCategories, currentID, currentName;
        beforeEach(function () {
            currentID = 'TF1004';
            currentName = '家电类';
            currentCategories = [
                {ID: 'TF1001', name: '饮料类', num: 3},
                {ID: 'TF1002', name: '干果类', num: 0}
            ];
            localStorageService.set('category', currentCategories);

        });
        it('categoryDetailSuccess is failed', function () {
            spyOn(CategoryService, 'categoryDetailSuccess').and.returnValue(false);

            var result = CategoryService.saveButton(currentID, currentName);

            expect(result).toEqual(false);
        });
        it('ID exist', function () {
            spyOn(CategoryService, 'categoryDetailSuccess').and.returnValue(true);
            spyOn(CategoryService, 'IDHasExist').and.returnValue(1);

            var result = CategoryService.saveButton(currentID, currentName);

            expect(CategoryService.IDHasExist).toHaveBeenCalledWith(currentID);
            expect(result).toEqual(false);
        });
        it('name exist', function () {
            spyOn(CategoryService, 'categoryDetailSuccess').and.returnValue(true);
            spyOn(CategoryService, 'IDHasExist').and.returnValue(-1);
            spyOn(CategoryService, 'nameHadExist').and.returnValue(1);

            var result = CategoryService.saveButton(currentID, currentName);

            expect(result).toEqual(false);
        });
        it('name and ID are not exist', function () {
            spyOn(CategoryService, 'categoryDetailSuccess').and.returnValue(true);
            spyOn(CategoryService, 'nameHadExist').and.returnValue(-1);
            spyOn(CategoryService, 'IDHasExist').and.returnValue(-1);
            spyOn(CategoryService, 'addNewCateogory');

            var result = CategoryService.saveButton(currentID, currentName);

            expect(CategoryService.addNewCateogory).toHaveBeenCalledWith(currentID, currentName);
            expect(result).toEqual(true);
        });
    });
    
    describe('test updateCategory:', function () {
        var updateCategory, allCategories;
        beforeEach(function () {
            updateCategory = {ID: 'TF1001', name: '饮料', num: 3};
            allCategories = [
                {ID: 'TF1001', name: '饮料类', num: 3},
                {ID: 'TF1002', name: '干果类', num: 0}
            ];

            localStorageService.set('updateCategory', updateCategory);
            localStorageService.set('category', allCategories);
        });
        it('updateCategory is ok', function () {
            var index = CategoryService.updateCategory();
            expect(index).toEqual(0);
            expect(localStorageService.get).toHaveBeenCalled();
        });
    });
    

    describe('test:deleteButton', function () {
        var deleteCategory , notDeleteCategory;
        beforeEach(function () {
            deleteCategory = {ID: 'TF1002', name: '干果类', num: '0'};
            notDeleteCategory = {ID: 'TF1001', name: '饮料类', num: '3'};

            var currentCategories = [
                {ID: 'TF1001', name: '饮料类', num: 3},
                {ID: 'TF1002', name: '干果类', num: 0}
            ];
            localStorageService.set('category', currentCategories);
        });
        it('num is not 0', function () {
            CategoryService.deleteButton(notDeleteCategory);
            var category = localStorageService.get('category');
            expect(category.length).toBe(2);
        });
        it('num is 0', function () {
            CategoryService.deleteButton(deleteCategory);
            var category = localStorageService.get('category');
            expect(category.length).toBe(1);
        });
    });

});

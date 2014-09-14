'use strict';
describe('test categoryAddService:', function () {

    beforeEach(module('letusgoApp'));
    var $location, localStorageService, categoryAddService;
    var store = {};
    beforeEach(inject(function ($injector) {

        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
        categoryAddService = $injector.get('categoryAddService');

        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorageService, 'set').and.callFake(function (key, value) {
            return store[key] = value;
        });
    }));

    var ID, name, num;
    describe('test category:', function () {
        beforeEach(function () {
            ID = 'TF1001';
            name = '饮料类';
            num = 3;
        });
        it('category is ok', function () {
            var category = categoryAddService.category(ID, name, num);
            expect(category.ID).toEqual('TF1001');
            expect(category.name).toEqual('饮料类');
            expect(category.num).toEqual(3);
        });
    });

    describe('test categoryDetailSuccess', function () {

        var categoryID, categoryName;
        beforeEach(function () {
            categoryID = undefined;
            categoryName = '饮料类';
        });
        it('categoryDetailSuccess is ok', function () {
            var result = categoryAddService.categoryDetailSuccess(categoryID, categoryName);
            expect(result).toEqual(undefined);
        });
    });


    var currentCategories = [
        {ID: 'TF1001', name: '饮料类', num: 3},
        {ID: 'TF1002', name: '干果类', num: 0}
    ];
    describe('test IDHasExist:', function () {
        var currentIDExist, currentIDNoExist;
        beforeEach(function () {

            currentIDExist = 'TF1001';
            currentIDNoExist = 'TF1003';

            localStorageService.set('category', currentCategories);
        });
        it(' ID exist', function () {
            var existResult = categoryAddService.IDHasExist(currentIDExist);
            expect(existResult).toBe(0);
        });
        it(' ID does not exist', function () {
            var existResult = categoryAddService.IDHasExist(currentIDNoExist);
            expect(existResult).toBe(-1);
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
            var existResult = categoryAddService.nameHadExist(currentNameExist);
            expect(existResult).toBe(0);
        });
        it('name does not exist', function () {
            var existResult = categoryAddService.nameHadExist(currentNameNoExist);
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

            spyOn(categoryAddService, 'category').and.returnValue({ID: 'TF1004', name: '家电类', num: 0});
        });
        it('category is null', function () {

            localStorageService.set('category', '');

            categoryAddService.addNewCateogory(currentID, currentName);
            expect(categoryAddService.category).toHaveBeenCalledWith(currentID, currentName, '0');

            var currentCategory = localStorageService.get('category');
            expect(currentCategory.length).toEqual(1);

            expect(currentCategory[0].name).toEqual('家电类');
            expect(currentCategory[0].ID).toEqual('TF1004');
            expect(currentCategory[0].num).toEqual(0);
        });
        it('category isnot null', function () {

            localStorageService.set('category', currentCategories);

            categoryAddService.addNewCateogory(currentID, currentName);

            expect(categoryAddService.category).toHaveBeenCalledWith(currentID, currentName, '0');

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
            spyOn(categoryAddService, 'IDHasExist');
            spyOn(categoryAddService, 'nameHadExist');
            spyOn(categoryAddService, 'categoryDetailSuccess').and.returnValue(false);
            spyOn(categoryAddService, 'addNewCateogory');

            var result = categoryAddService.saveButton(currentID, currentName);

            expect(result).toEqual(false);
        });
        it('ID exist', function () {
            spyOn(categoryAddService, 'IDHasExist').and.returnValue(1);
            spyOn(categoryAddService, 'nameHadExist');

            var result = categoryAddService.saveButton(currentID, currentName);

            expect(categoryAddService.IDHasExist).toHaveBeenCalledWith(currentID);
            expect(categoryAddService.nameHadExist).toHaveBeenCalledWith(currentName);
            expect(result).toEqual(false);
        });
        it('name exist', function () {
            spyOn(categoryAddService, 'nameHadExist').and.returnValue(1);
            spyOn(categoryAddService, 'IDHasExist');

            var result = categoryAddService.saveButton(currentID, currentName);

            expect(result).toEqual(false);
        });
        it('name and ID are not exist', function () {
            spyOn(categoryAddService, 'nameHadExist').and.returnValue(-1);
            spyOn(categoryAddService, 'IDHasExist').and.returnValue(-1);
            spyOn(categoryAddService, 'addNewCateogory');

            var result = categoryAddService.saveButton(currentID, currentName);

            expect(categoryAddService.addNewCateogory).toHaveBeenCalledWith(currentID, currentName);
            expect(result).toEqual(true);
        });
    });
});

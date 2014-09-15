'use strict';
describe('test goodsManageService:', function () {

    beforeEach(module('letusgoApp'));

    var goodsManageService, localStorageService, $location;
    var store = {};
    beforeEach(inject(function ($injector) {

        goodsManageService = $injector.get('goodsManageService');
        localStorageService = $injector.get('localStorageService');
        $location = $injector.get('$location');

        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorageService, 'set').and.callFake(function (key, value) {
            return store[key] = value;
        });
    }));

    describe('test updateItem ', function () {
        var allGoods, updateItem;
        beforeEach(function () {
            updateItem = {category: '饮料类', name: '橙汁', price: '3.00', unit: '瓶'};
            localStorageService.set('updateItem', updateItem);

            allGoods = [
                {category: '饮料类', name: '可乐', price: '3.00', unit: '瓶'},
                {category: '饮料类', name: '橙汁', price: '3.00', unit: '瓶'}
            ];
            localStorageService.set('allGoods', allGoods);
        });
        it('updateItem is ok', function () {
            var result = goodsManageService.updateItem();

            expect(localStorageService.set).toHaveBeenCalledWith('allGoods', allGoods);
            expect(result).toEqual(1);
        });
    });


    describe('test category:', function () {
        var good;
        beforeEach(function () {
            good = {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'};
        });
        it('category is ok', function () {
            var item = goodsManageService.item(good.category, good.name, good.price, good.unit);

            expect(item.category).toEqual('饮料类');
            expect(item.name).toEqual('雪碧');
            expect(item.price).toEqual('3.00');
            expect(item.unit).toEqual('瓶');
        });
    });

    describe('test hasExistItem:', function () {
        beforeEach(function () {
            var good = [
                {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'}
            ];
            localStorageService.set('allGoods', good);
        });
        it('hasExistItem is true', function () {
            var hasExistItem = goodsManageService.hasExistItem('雪碧');
            expect(hasExistItem).toEqual(0);
        });
        it('hasExistItem is false', function () {
            var hasExistItem = goodsManageService.hasExistItem('可乐');
            expect(hasExistItem).toEqual(-1);
        });
    });

    describe('test itemDetailSuccess:', function () {

        it('itemDetailSuccess is ok', function () {

            var firstResult= goodsManageService.itemDetailSuccess(false, false, false, true);
            var secondResult = goodsManageService.itemDetailSuccess(true, true, true, true);

            expect(firstResult).toEqual(false);
            expect(secondResult ).toEqual(true);
        });
    });

    describe('test saveItem:', function () {
        var allGoods;
        beforeEach(function () {

            allGoods = [
                {category: '饮料类', name: '可乐', price: '3.00', unit: '瓶'},
                {category: '饮料类', name: '橙汁', price: '3.00', unit: '瓶'}
            ];
            var item = {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'};
            spyOn(goodsManageService, 'item').and.returnValue(item);
        });
        it('allGoods is null', function () {

            localStorageService.set('allGoods', '');

            goodsManageService.saveItem('饮料类', '雪碧', '3.00', '瓶');
            var currentItems = localStorageService.get('allGoods');

            expect(goodsManageService.item).toHaveBeenCalled();
            expect(currentItems.length).toBe(1);
        });
        it('allGoods isnot null', function () {
            localStorageService.set('allGoods', allGoods);

            goodsManageService.saveItem('饮料类', '雪碧', '3.00', '瓶');
            var currentItems = localStorageService.get('allGoods');

            expect(goodsManageService.item).toHaveBeenCalled();
            expect(currentItems.length).toBe(3);
        });
    });

    describe('test addCategoryNum', function () {
        var category;
        beforeEach(function () {
            category = [
                {ID: 'TF1001', name: '饮料类', num: 3}
            ];
            localStorageService.set('category', category);

            // item = {category:'饮料类',  name:'可乐', price:'3.00', unit:'瓶'};
        });
        it('addCategoryNum is ok', function () {
            goodsManageService.addCategoryNum('饮料类');
            var result = localStorageService.get('category');

            expect(result[0].num).toEqual(4);
        });
    });

    describe('test saveButton:', function () {
        it('itemDetail isnot integreted', function () {
            spyOn(goodsManageService, 'itemDetailSuccess').and.returnValue(false);
            spyOn(goodsManageService, 'hasExistItem').and.returnValue(-1);

            var result = goodsManageService.saveButton('饮料类', '雪碧', '3.00', '瓶');
            expect(result).toEqual(false);
        });
        it('only itemName has existed', function () {
            spyOn(goodsManageService, 'itemDetailSuccess').and.returnValue(true);
            spyOn(goodsManageService, 'hasExistItem').and.returnValue(1);

            var result = goodsManageService.saveButton('饮料类', '雪碧', '3.00', '瓶');
            expect(result).toEqual(false);
        });
        it('saveButton is ok', function () {
            spyOn(goodsManageService, 'itemDetailSuccess').and.returnValue(true);
            spyOn(goodsManageService, 'hasExistItem').and.returnValue(-1);
            spyOn(goodsManageService, 'saveItem');
            spyOn(goodsManageService, 'addCategoryNum');
            spyOn($location, 'path');

            var result = goodsManageService.saveButton({name: '饮料类'}, '雪碧', '3.00', '瓶');

            expect(goodsManageService.saveItem).toHaveBeenCalledWith('饮料类', '雪碧', '3.00', '瓶');
            expect(goodsManageService.addCategoryNum).toHaveBeenCalledWith('饮料类');
            expect($location.path).toHaveBeenCalledWith('/goodsManage');
            expect(result).toEqual(true);
        });
    });

    describe('test getAllCategories', function () {
        beforeEach(function () {
            var category = [
                {category: '饮料类', name: '可乐', price: '3.00', unit: '瓶'},
                {category: '饮料类', name: '橙汁', price: '3.00', unit: '瓶'}
            ];
            localStorageService.set('category', category);
        });
        it('getAllCategories is ok', function () {

            var result = goodsManageService.getAllCategories();
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('可乐');
        });
    });
    
    
    describe('test decreaseCategoryNum:', function () {
        var item,notExistItem, category;
        beforeEach(function () {
            category = [
                            {ID: 'TF1001', name: '饮料类', num: 3}
                        ];
            localStorageService.set('category', category);

            item = {category: '饮料类', name: '可乐', price: '3.00', unit: '瓶'};
            notExistItem = {category: '水果类', name: '可乐', price: '3.00', unit: '瓶'};
        });
        it('processCategory is ok', function () {
            goodsManageService.decreaseCategoryNum(item);
            var existResult = localStorageService.get('category');
            expect(existResult[0].num).toEqual(2);

            goodsManageService.decreaseCategoryNum(notExistItem);
            var notExistResult = localStorageService.get('category');

            expect(notExistResult[0].num).toEqual(2);
        });
    });

    describe('test deleteButton:', function () {
        var item, allItems;
        beforeEach(function () {

            item = {category: '饮料类', name: '可乐', price: '3.00', unit: '瓶'};
            allItems = [
                {category: '饮料类', name: '可乐', price: '3.00', unit: '瓶'},
                {category: '饮料类', name: '橙汁', price: '3.00', unit: '瓶'}
            ];
            localStorageService.set('allGoods', allItems);

            spyOn(goodsManageService, 'decreaseCategoryNum');
        });
        it('deleteButton is ok', function () {
            goodsManageService.deleteButton(item);
            var allItems = localStorageService.get('allGoods');

            expect(goodsManageService.decreaseCategoryNum).toHaveBeenCalledWith(item);
            expect(allItems.length).toBe(1);
        });
    });

});

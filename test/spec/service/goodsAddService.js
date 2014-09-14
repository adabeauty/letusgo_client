'use strict';
describe('test goodsAddService:', function () {

    beforeEach(module('letusgoApp'));

    var store = {};
    var goodsAddService, $location, localStorageService;
    beforeEach(inject(function ($injector) {

        goodsAddService = $injector.get('goodsAddService');
        localStorageService = $injector.get('localStorageService');
        $location = $injector.get('$location');

        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorageService, 'set').and.callFake(function (key, value) {
            return store[key] = value;
        });
    }));

    describe('test category:', function () {
        var good;
        beforeEach(function () {
            good = {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'};
        });
        it('category is ok', function () {
            var item = goodsAddService.item(good.category, good.name, good.price, good.unit);

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
            var hasExistItem = goodsAddService.hasExistItem('雪碧');
            expect(hasExistItem).toEqual(0);
        });
        it('hasExistItem is false', function () {
            var hasExistItem = goodsAddService.hasExistItem('可乐');
            expect(hasExistItem).toEqual(-1);
        });
    });

    describe('test itemDetailSuccess:', function () {

        it('itemDetailSuccess is ok', function () {

            var firstResult= goodsAddService.itemDetailSuccess(false, false, false, true);
            var secondResult = goodsAddService.itemDetailSuccess(true, true, true, true);

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
            spyOn(goodsAddService, 'item').and.returnValue(item);
        });
        it('allGoods is null', function () {

            localStorageService.set('allGoods', '');

            goodsAddService.saveItem('饮料类', '雪碧', '3.00', '瓶');
            var currentItems = localStorageService.get('allGoods');

            expect(goodsAddService.item).toHaveBeenCalled();
            expect(currentItems.length).toBe(1);
        });
        it('allGoods isnot null', function () {
            localStorageService.set('allGoods', allGoods);

            goodsAddService.saveItem('饮料类', '雪碧', '3.00', '瓶');
            var currentItems = localStorageService.get('allGoods');

            expect(goodsAddService.item).toHaveBeenCalled();
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
            goodsAddService.addCategoryNum('饮料类');
            var result = localStorageService.get('category');

            expect(result[0].num).toEqual(4);
        });
    });

    describe('test saveButton:', function () {
        it('itemDetail isnot integreted', function () {
            spyOn(goodsAddService, 'itemDetailSuccess').and.returnValue(false);
            spyOn(goodsAddService, 'hasExistItem').and.returnValue(-1);

            var result = goodsAddService.saveButton('饮料类', '雪碧', '3.00', '瓶');
            expect(result).toEqual(false);
        });
        it('only itemName has existed', function () {
            spyOn(goodsAddService, 'itemDetailSuccess').and.returnValue(true);
            spyOn(goodsAddService, 'hasExistItem').and.returnValue(1);

            var result = goodsAddService.saveButton('饮料类', '雪碧', '3.00', '瓶');
            expect(result).toEqual(false);
        });
        it('saveButton is ok', function () {
            spyOn(goodsAddService, 'itemDetailSuccess').and.returnValue(true);
            spyOn(goodsAddService, 'hasExistItem').and.returnValue(-1);
            spyOn(goodsAddService, 'saveItem');
            spyOn(goodsAddService, 'addCategoryNum');
            spyOn($location, 'path');

            var result = goodsAddService.saveButton({name: '饮料类'}, '雪碧', '3.00', '瓶');

            expect(goodsAddService.saveItem).toHaveBeenCalledWith('饮料类', '雪碧', '3.00', '瓶');
            expect(goodsAddService.addCategoryNum).toHaveBeenCalledWith('饮料类');
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

            var result = goodsAddService.getAllCategories();
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('可乐');
        });
    });
});

'use strict';
describe('test GoodService:', function () {

    beforeEach(module('letusgoApp'));

    var GoodService, localStorageService, $location, $http, $httpBackend;
    beforeEach(inject(function ($injector) {

        GoodService = $injector.get('GoodService');
        localStorageService = $injector.get('localStorageService');
        $location = $injector.get('$location');
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
    }));

    describe('item', function(){
       beforeEach(function(){

       });
        var goods = [{"Id":3,"category":"nuts","name":"kaixinguo","price":"2.50","unit":"jin"}];
       it('should return a object', function(){
           var object = GoodService.item(goods, 'drinks', '可口可乐', '3.00', '瓶');
           expect(object.Id).toEqual(4);
           expect(object.name).toEqual('可口可乐');
       });

    });

    describe('hasExistItem:', function () {

        var goods = [ {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'}];

        it('hasExistItem is true', function () {
            var hasExistItem = GoodService.hasExistItem(goods, '雪碧');
            expect(hasExistItem).toEqual(0);
        });
        it('hasExistItem is false', function () {
            var hasExistItem = GoodService.hasExistItem(goods, '可乐');
            expect(hasExistItem).toEqual(-1);
        });
    });

    describe('saveItem', function () {
        var allGoods;
        beforeEach(function () {
            allGoods = [
                {category: '饮料类', name: '可乐', price: '3.00', unit: '瓶'},
                {category: '饮料类', name: '橙汁', price: '3.00', unit: '瓶'}
            ];
            var item = {Id: 1, category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'};
            spyOn(GoodService, 'item').and.returnValue(item);
            $httpBackend.when('POST', '/api/goods').respond([{}, {}, {}]);
            GoodService.saveItem(allGoods, '饮料类', '雪碧', '3.00', '瓶');
        });
        it('allGoods is null', function () {
            expect(GoodService.item).toHaveBeenCalled();
            expect(allGoods.length).toBe(3);
            $httpBackend.expectPOST('/api/goods');
            $httpBackend.flush();
        });

    });

    xdescribe('modifyCategoryNum', function () {
        var category =[ {ID: 'TF1001', name: '饮料类', num: 3}];

        it('should put modified category to server', function () {

        });

    });

    describe('succeedSave', function(){
        var goods, name, itemName, itemPrice, itemUnit;
       beforeEach(function(){
           spyOn(GoodService, 'saveItem');
           spyOn(GoodService, 'modifyCategoryNum');
           spyOn($location, 'path');
           GoodService.succeedSave();
       });
       it('should save category', function(){
           expect(GoodService.saveItem).toHaveBeenCalledWith(goods, name, itemName, itemPrice, itemUnit);
           expect(GoodService.modifyCategoryNum).toHaveBeenCalledWith(1, name);
           expect($location.path).toHaveBeenCalledWith('/goodsManage');
       })
    });

    xdescribe('saveButton', function () {
        it('itemDetail isnot integreted', function () {
            spyOn(GoodService, 'itemDetailSuccess').and.returnValue(false);
            spyOn(GoodService, 'hasExistItem').and.returnValue(-1);

            var result = GoodService.saveButton('饮料类', '雪碧', '3.00', '瓶');
            expect(result).toEqual(false);
        });
        it('without integrated information should alert', function () {
            spyOn(GoodService, 'itemDetailSuccess').and.returnValue(true);
            spyOn(GoodService, 'hasExistItem').and.returnValue(1);

            var result = GoodService.saveButton('饮料类', '雪碧', '3.00', '瓶');
            expect(result).toEqual(false);
        });
        it('with existed name should alert', function () {
            spyOn(GoodService, 'itemDetailSuccess').and.returnValue(true);
            spyOn(GoodService, 'hasExistItem').and.returnValue(-1);
            spyOn(GoodService, 'saveItem');
            spyOn(GoodService, 'addCategoryNum');
            spyOn($location, 'path');

            var result = GoodService.saveButton({name: '饮料类'}, '雪碧', '3.00', '瓶');

            expect(GoodService.saveItem).toHaveBeenCalledWith('饮料类', '雪碧', '3.00', '瓶');
            expect(GoodService.addCategoryNum).toHaveBeenCalledWith('饮料类');
            expect($location.path).toHaveBeenCalledWith('/goodsManage');
            expect(result).toEqual(true);
        });
        it('with integrated information should post', function(){
            
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

            var result = GoodService.getAllCategories();
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
            GoodService.decreaseCategoryNum(item);
            var existResult = localStorageService.get('category');
            expect(existResult[0].num).toEqual(2);

            GoodService.decreaseCategoryNum(notExistItem);
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

            spyOn(GoodService, 'decreaseCategoryNum');
        });
        it('deleteButton is ok', function () {
            GoodService.deleteButton(item);
            var allItems = localStorageService.get('allGoods');

            expect(GoodService.decreaseCategoryNum).toHaveBeenCalledWith(item);
            expect(allItems.length).toBe(1);
        });
    });
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
            var result = GoodService.updateItem();

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
            var item = GoodService.item(good.category, good.name, good.price, good.unit);

            expect(item.category).toEqual('饮料类');
            expect(item.name).toEqual('雪碧');
            expect(item.price).toEqual('3.00');
            expect(item.unit).toEqual('瓶');
        });
    });

});

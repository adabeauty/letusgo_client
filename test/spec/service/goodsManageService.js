'use strict';
xdescribe('test GoodService:', function () {

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

    xdescribe('getAllCategories', function () {
        beforeEach(function () {
            var category = [
                {category: '饮料类', name: '可乐', price: '3.00', unit: '瓶'},
                {category: '饮料类', name: '橙汁', price: '3.00', unit: '瓶'}
            ];
            localStorageService.set('category', category);
        });
        it('should get all categories', function () {

            var result = GoodService.getAllCategories();
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual('可乐');
        });
    });

    describe('updateItem ', function () {

        beforeEach(function () {
            var updateItem = {Id: '1', category: '饮料类', name: '橙汁', price: '3.00', unit: '瓶'};
            $httpBackend.when('PUT', '/api/goods/'+'1').respond([{}, {}, {}]);
            GoodService.updateItem(updateItem);
        });
        it('should put updated item to server', function () {
            $httpBackend.expectPUT('/api/goods/' + '1');
            $httpBackend.flush();
        });
    });

    describe('deleteButton', function () {
        var item;
        beforeEach(function () {
            item = {Id: '1', category: '饮料类', name: '可乐', price: '3.00', unit: '瓶'};
            spyOn(GoodService, 'modifyCategoryNum');
            $httpBackend.when('DELETE', '/api/goods/'+'1').respond([{}, {}, {}]);
            GoodService.deleteButton(item);
        });
        it('deleteButton is ok', function () {
            expect(GoodService.modifyCategoryNum).toHaveBeenCalledWith(-1, item.category);
            $httpBackend.expectDELETE('/api/goods/' + '1');
            $httpBackend.flush();
        });
    });


});

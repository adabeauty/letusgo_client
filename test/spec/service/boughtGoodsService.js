'use strict';
describe('cartItemService test: ', function () {

    beforeEach(module('letusgoApp'));
    var BoughtGoodsService, localStorageService, $http, $httpBackend;
    beforeEach(inject(function ($injector) {

        BoughtGoodsService = $injector.get('BoughtGoodsService');
        localStorageService = $injector.get('localStorageService');
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
    }));

    describe('boughtItem', function () {
        var item = {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'};
        it('should return a object:', function () {
            var boughtItem = BoughtGoodsService.BoughtItem(item, 3);
            expect(boughtItem.num).toEqual(3);
        });
    });

    describe('hasExistGoods', function () {
        var boughtItem;
        var existName, unexistName;
        beforeEach(function () {
            boughtItem = {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}};
            existName = '可口可乐';
            unexistName = '雪碧';
        });

        it('of existItem should work', function () {
            var result = BoughtGoodsService.hasExistGoods(existName, [boughtItem]);
            expect(result.item.name).toEqual('可口可乐');
        });
        it('of noExistItem should work', function () {
            var result = BoughtGoodsService.hasExistGoods(unexistName, [boughtItem]);
            expect(result).toEqual(undefined);
        });

    });

    xdescribe('addCartNum()', function () {

        it('boughtGoods is null', function () {

            spyOn(BoughtGoodsService, 'hasExistGoods').and.returnValue(undefined);
            spyOn(BoughtGoodsService, 'BoughtItem').and.returnValue(boughtItem);

            BoughtGoodsService.addCartNum(item,  done);
            expect(BoughtGoodsService.hasExistGoods).toHaveBeenCalled();
            expect(BoughtGoodsService.BoughtItem).toHaveBeenCalled();
            expect(boughtGoods[0].item.name).toEqual('可口可乐');
            expect(boughtGoods[0].num).toEqual(1);
        });

        it('boughtGoods is exist', function () {

            spyOn(BoughtGoodsService, 'hasExistGoods').and.returnValue(boughtItem);
            localStorageService.set('boughtGoods', boughtItem);
            BoughtGoodsService.addCartNum(boughtItem);

            var boughtGoods = localStorageService.get('boughtGoods');
            expect(BoughtGoodsService.hasExistGoods).toHaveBeenCalled();
            expect(boughtGoods.num).toEqual(2);
        });

    });

    describe('cartList', function () {
        var className = '饮料类';
        var boughtItem = {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}};
        it('should return a object', function () {
            var cartListResult = BoughtGoodsService.cartList(className, boughtItem);
            expect(cartListResult.categoryName).toEqual('饮料类');
        });
    });
    var boughtItems = [
        {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}},
        {num: 3, item: {category: '零食类', name: '可比克', price: '4.50', unit: '袋'}},
        {num: 4, item: {category: '干果类', name: '开心果', price: '15.00', unit: '袋'}}
    ];
    describe('getGoodsArray', function(){
        it('should return a array', function(){
            var groupArray = BoughtGoodsService.getGoodsArray(boughtItems);
            expect(groupArray.length).toBe(3);
            expect(groupArray[0].length).toBe(1);
        });
    });

    var item1 = {
        num: 1,
        item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}
    };
    var item2 = {
        num: 3,
        item: {category: '零食类', name: '可比克', price: '4.50', unit: '袋'}
    };
    describe('generateCartGoods', function () {
        var boughtGoods, goodsArray;
        beforeEach(function () {
            goodsArray = [[item1],[item2]];
            spyOn(BoughtGoodsService, 'getGoodsArray').and.returnValue(goodsArray);
        });
        it('should return cartList array', function () {
            var cartListArray = BoughtGoodsService.generateCartGoods(boughtGoods);
            expect(BoughtGoodsService.getGoodsArray).toHaveBeenCalled();
            expect(cartListArray.length).toBe(2);
        });

    });

    describe('getTotalMoney', function () {
        var boughtGoods = [item1, item2];
        it('should return total', function () {
            var totalMoney = BoughtGoodsService.getTotalMoney(boughtGoods);
            expect(totalMoney).toBe(16.5);
        });
    });

    describe('getClickCount', function () {
        var boughtGoods = [item1, item2];
        it('should return totalCount', function () {
            var totalCount = BoughtGoodsService.getClickCount(boughtGoods);
            expect(totalCount).toBe(4);
        });

    });
    xdescribe('refresh', function(){
        beforeEach('', function(){

        });
        it('should refresh date', function(){

        });
    });
    xdescribe('addClickCount', function(){
        beforeEach('', function(){

        });
        it('should add clickCount', function(){

        });
    });
    describe('deleteOrDecrease:', function(){
       it('decrease by 1', function(){
           var boughtItems = [item1, item2];
           var deleteResult = BoughtGoodsService.decreaseOrDelete(boughtItems, 0);
           expect(deleteResult.length).toBe(1);
       });
       it('delete', function(){
           var boughtItems = [item1, item2];
           var decraseResult = BoughtGoodsService.decreaseOrDelete(boughtItems, 1);
           expect(decraseResult.length).toBe(2);
       });
    });

    describe('processNum', function () {
        var i, directionUp, directionDown, boughtGoods;
        beforeEach(function () {
            boughtGoods = [item1, item2];
            i = 1;
            directionUp = 1;
            directionDown = 0;
//            $httpBackend.when('PUT', '/api/boughtGoods'+1);
        });

        it('of up can work', function () {
            BoughtGoodsService.processNum(boughtGoods, directionUp, i);
//            $httpBackend.expectPUT('/api/boughtGoods');
//            $httpBackend.flush();
        });
        it('of down can work', function () {
            spyOn(BoughtGoodsService, 'decreaseOrDelete');
            BoughtGoodsService.processNum(boughtGoods, directionDown, i);
            expect(BoughtGoodsService.decreaseOrDelete).toHaveBeenCalledWith(boughtGoods, i);
        });
    });

    describe('modifyCategoryNum', function(){
        beforeEach(function(){

        });
       it('should modify categoryNum', function(){

       });
    });

    xdescribe('test deleteItem():', function () {
        var deleteGood;
        beforeEach(function () {
            $httpBackend.when('DELETE', '/api/boughtGoods');
            deleteGood = {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}};
            BoughtGoodsService.deleteItem(deleteGood);
        });
        it('deleteItem is ok', function () {
            $httpBackend.expectDELETE('/api/boughtGoods');
            $httpBackend.flush();
        });
    });
    describe('clearDate()', function () {
        beforeEach(function () {
            $httpBackend.when('POST', '/api/boughtGoods').respond([{}, {}, {}]);
            BoughtGoodsService.clearDate();
        });
        it('clearDate is ok', function () {
            $httpBackend.expectPOST('/api/boughtGoods');
            $httpBackend.flush();
        });
    });
});

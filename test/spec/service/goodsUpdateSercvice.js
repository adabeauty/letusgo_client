// 'use strict';
describe('test goodsUpdateService', function () {

    beforeEach(module('letusgoApp'));

    var store = {};
    var goodsUpdateService, localStorageService;
    beforeEach(inject(function ($injector) {

        goodsUpdateService = $injector.get('goodsUpdateService');
        localStorageService = $injector.get('localStorageService');

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
            var result = goodsUpdateService.updateItem();

            expect(localStorageService.set).toHaveBeenCalledWith('allGoods', allGoods);
            expect(result).toEqual(1);
        });
    });

});

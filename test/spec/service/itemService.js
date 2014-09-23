'use strict';
xdescribe('itemService test:', function () {

    var ItemService, localStorageService;
    var store = {};

    beforeEach(module('letusgoApp'));

    beforeEach(inject(function ($injector) {

        ItemService = $injector.get('ItemService');
        localStorageService = $injector.get('localStorageService');

        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorageService, 'set').and.callFake(function (key, value) {
            return store[key] = value;
        });

    }));
    var category, name, price, unit;
    describe('test item()', function () {
        beforeEach(function () {
            category = '饮料类';
            name = '可口可乐';
            price = '3.00';
            unit = '瓶';
        });
        it('item is ok', function () {
            var itemResult = ItemService.item(category, name, price, unit);
            expect(itemResult.name).toEqual('可口可乐');
        });
    });

    describe('test loadItems()', function () {
        beforeEach(function () {
            spyOn(ItemService, 'item');
        });
        it('loadItems is ok', function () {

            var itemResult = ItemService.loadItems();

            expect(itemResult.length).toEqual(7);
            expect(ItemService.item.calls.count()).toEqual(7);
        });
    });

});

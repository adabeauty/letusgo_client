// 'use strict';
describe('test categoryUpdateService:', function () {

    beforeEach(module('letusgoApp'));
    var store = {};
    var cagtegoryUpdateService, localStorageService;
    beforeEach(inject(function ($injector) {

        cagtegoryUpdateService = $injector.get('cagtegoryUpdateService');
        localStorageService = $injector.get('localStorageService');

        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorageService, 'set').and.callFake(function (key, value) {
            return store[key] = value;
        });
    }));

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
            var index = cagtegoryUpdateService.updateCategory();
            expect(index).toEqual(0);
            expect(localStorageService.get).toHaveBeenCalled();
        });
    });

});

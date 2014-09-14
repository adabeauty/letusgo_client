describe('test: categoryManageService:', function () {

    var categoryManageService, localStorageService;
    var store = {};
    beforeEach(module('letusgoApp'));
    beforeEach(inject(function ($injector) {

        categoryManageService = $injector.get('categoryManageService');
        localStorageService = $injector.get('localStorageService');

        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorageService, 'set').and.callFake(function (key, value) {
            return store[key] = value;
        });
    }));

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
            categoryManageService.deleteButton(notDeleteCategory);
            var category = localStorageService.get('category');
            expect(category.length).toBe(2);
        });
        it('num is 0', function () {
            categoryManageService.deleteButton(deleteCategory);
            var category = localStorageService.get('category');
            expect(category.length).toBe(1);
        });
    });

});

describe('test categoryManage:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, CategoryService, localStorageService, $controller, creatCategoryCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        CategoryService = $injector.get('CategoryService');
        localStorageService = $injector.get('localStorageService');

        $controller = $injector.get('$controller');
        creatCategoryCtrl = function () {
            return $controller('CategoryCtrl', {
                $scope: $scope,
                CategoryService: CategoryService,
                localStorageService: localStorageService
            });
        }
    }));

    describe('outside', function () {
        beforeEach(function () {
            spyOn($scope, '$emit');
            spyOn(localStorageService, 'get');

            creatCategoryCtrl();
        });

        it('outside is ok', function () {
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-incategoryManage');
            expect(localStorageService.get).toHaveBeenCalledWith('category');
        });
    });

    describe('test deleteButton()', function () {
        var every;
        beforeEach(function () {
            every = {ID: 'TF1001', name: '饮料类', num: '1'};
            spyOn(localStorageService, 'get');
            creatCategoryCtrl();
        });
        it('deleteButton is ok', function () {

            spyOn(CategoryService, 'deleteButton');
            $scope.deleteButton(every);

            expect(CategoryService.deleteButton).toHaveBeenCalledWith(every);
            expect(localStorageService.get).toHaveBeenCalledWith('category');
        });
    });
    describe('test editButton()', function () {
        var categoryDetail;
        beforeEach(function () {
            categoryDetail = {ID: 'TF1001', name: '饮料类', num: '1'};

            spyOn(localStorageService, 'get');
            creatCategoryCtrl();
        });
        it('editButton is ok', function () {

            spyOn(localStorageService, 'set');
            $scope.editButton(categoryDetail);

            expect(localStorageService.set).toHaveBeenCalledWith('updateCategory', categoryDetail);
        });
    });

});

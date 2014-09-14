describe('test categoryManage:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, categoryManageService, localStorageService, $controller, creatCategoryCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        categoryManageService = $injector.get('categoryManageService');
        localStorageService = $injector.get('localStorageService');

        $controller = $injector.get('$controller');
        creatCategoryCtrl = function () {
            return $controller('CategoryCtrl', {
                $scope: $scope,
                categoryManageService: categoryManageService,
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

            spyOn(categoryManageService, 'deleteButton');
            $scope.deleteButton(every);

            expect(categoryManageService.deleteButton).toHaveBeenCalledWith(every);
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
    // describe('test addButton()', function(){
    //
    //     it('addButton is ok', function(){
    //         creatCategoryCtrl();
    //         $scope.addButton();
    //         expect($scope.add).toEqual(true);
    //     });
    // });
    //
    // describe('test saveButton()', function(){
    //
    //     beforeEach(function(){
    //
    //         spyOn(localStorageService, 'get');
    //         creatCategoryCtrl();
    //     });
    //     it('saveButton is ok', function(){
    //
    //         spyOn(categoryManageService, 'saveButton');
    //         $scope.saveButton();
    //
    //         expect(categoryManageService.saveButton).toHaveBeenCalled();
    //         expect(localStorageService.get).toHaveBeenCalledWith('category');
    //     });
    // });
});

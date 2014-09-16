describe('test goodsAdd:', function () {
    beforeEach(module('letusgoApp'));
    var $scope, $location, localStorageService, GoodService, $controller, creatGoodsAddCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
        GoodService = $injector.get('GoodService');

        $controller = $injector.get('$controller');

        creatGoodsAddCtrl = function () {
            return $controller('GoodsAddCtrl', {
                $scope: $scope,
                $location: $location,
                localStorageService: localStorageService,
                GoodService: GoodService
            });
        }
    }));

    beforeEach(function () {
        spyOn(GoodService, 'getAllCategories');
        creatGoodsAddCtrl();
    });

    describe('test saveButton', function () {
        beforeEach(function () {
            spyOn(GoodService, 'saveButton');
            spyOn(localStorageService, 'get');

            $scope.saveButton();
        });
        it('saveButton is ok', function () {
            expect(GoodService.saveButton).toHaveBeenCalledWith($scope.itemCategory, $scope.itemName, $scope.itemPrice, $scope.itemUnit);
            expect(localStorageService.get).toHaveBeenCalledWith('allGoods');
        });
    });

    describe('test cancel', function () {
        beforeEach(function () {
            spyOn($location, 'path');
            $scope.cancel();
        });
        it('cancel is ok', function () {
            expect($location.path).toHaveBeenCalledWith('/goodsManage');
        });
    });

});

describe('test goodsAdd:', function () {
    beforeEach(module('letusgoApp'));
    var $scope, $location, localStorageService, goodsAddService, $controller, creatGoodsAddCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
        goodsAddService = $injector.get('goodsAddService');

        $controller = $injector.get('$controller');

        creatGoodsAddCtrl = function () {
            return $controller('GoodsAddCtrl', {
                $scope: $scope,
                $location: $location,
                localStorageService: localStorageService,
                goodsAddService: goodsAddService
            });
        }
    }));

    beforeEach(function () {
        spyOn(goodsAddService, 'getAllCategories');
        creatGoodsAddCtrl();
    });

    // describe('$scope.allCategories', function(){
    //     expect(goodsAddService.getAllCategories).toHaveBeendCalled();
    // });
    //
    describe('test saveButton', function () {
        beforeEach(function () {
            spyOn(goodsAddService, 'saveButton');
            spyOn(localStorageService, 'get');

            $scope.saveButton();
        });
        it('saveButton is ok', function () {
            expect(goodsAddService.saveButton).toHaveBeenCalledWith($scope.itemCategory, $scope.itemName, $scope.itemPrice, $scope.itemUnit);
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

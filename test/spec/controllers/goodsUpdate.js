// 'use strict';
describe('test goodsUpdate:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, localStorageService, goodsUpdateService, $controller, GoodsUpdateCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
        goodsUpdateService = $injector.get('goodsUpdateService');

        $controller = $injector.get('$controller');

        creatGoodsAddCtrl = function () {
            return $controller('GoodsUpdateCtrl', {
                $scope: $scope,
                $location: $location,
                localStorageService: localStorageService,
                goodsUpdateService: goodsUpdateService
            });
        }
    }));

    beforeEach(function () {
        spyOn(localStorageService, 'get');
        creatGoodsAddCtrl();
    });

    describe('test updateItem is ok', function () {
        beforeEach(function () {
            spyOn(localStorageService, 'set');
            spyOn(goodsUpdateService, 'updateItem');
            spyOn($location, 'path');
        });
        it('updateItem is ok', function () {
            $scope.updateItem();

            expect(localStorageService.get).toHaveBeenCalledWith('updateItem');
            expect(localStorageService.set).toHaveBeenCalledWith('updateItem', $scope.updateObject);
            expect(goodsUpdateService.updateItem).toHaveBeenCalled();
            expect($location.path).toHaveBeenCalledWith('/goodsManage');
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

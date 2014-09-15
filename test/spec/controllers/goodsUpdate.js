// 'use strict';
describe('test goodsUpdate:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, localStorageService, goodsManageService, $controller, GoodsUpdateCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
        goodsManageService = $injector.get('goodsManageService');

        $controller = $injector.get('$controller');

        creatGoodsAddCtrl = function () {
            return $controller('GoodsUpdateCtrl', {
                $scope: $scope,
                $location: $location,
                localStorageService: localStorageService,
                goodsManageService: goodsManageService
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
            spyOn(goodsManageService, 'updateItem');
            spyOn($location, 'path');
        });
        it('updateItem is ok', function () {
            $scope.updateItem();

            expect(localStorageService.get).toHaveBeenCalledWith('updateItem');
            expect(localStorageService.set).toHaveBeenCalledWith('updateItem', $scope.updateObject);
            expect(goodsManageService.updateItem).toHaveBeenCalled();
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

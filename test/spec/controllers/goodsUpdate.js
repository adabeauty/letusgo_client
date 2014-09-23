// 'use strict';
xdescribe('test goodsUpdate:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, localStorageService, GoodService, $controller, GoodsUpdateCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
        GoodService = $injector.get('GoodService');

        $controller = $injector.get('$controller');

        creatGoodsAddCtrl = function () {
            return $controller('GoodsUpdateCtrl', {
                $scope: $scope,
                $location: $location,
                localStorageService: localStorageService,
                GoodService: GoodService
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
            spyOn(GoodService, 'updateItem');
            spyOn($location, 'path');
        });
        it('updateItem is ok', function () {
            $scope.updateItem();

            expect(localStorageService.get).toHaveBeenCalledWith('updateItem');
            expect(localStorageService.set).toHaveBeenCalledWith('updateItem', $scope.updateObject);
            expect(GoodService.updateItem).toHaveBeenCalled();
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

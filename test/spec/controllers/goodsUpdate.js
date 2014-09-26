'use strict';
describe('test goodsUpdate:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, localStorageService, GoodService, $controller, GoodsUpdateCtrl, creatGoodsAddCtrl;
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

    describe('outside function', function(){
       it('should work', function(){
          expect(localStorageService.get).toHaveBeenCalledWith('updateItem');
       });
    });

    describe('test updateItem is ok', function () {
        beforeEach(function () {
            spyOn(GoodService, 'updateItem');
            spyOn($location, 'path');
            $scope.updateItem();
        });
        it('updateItem is ok', function () {
            expect(GoodService.updateItem).toHaveBeenCalledWith($scope.updateObject);
            expect($location.path).toHaveBeenCalledWith('/goodsManage');
        });
    });

    describe('test cancel', function () {
        beforeEach(function () {
            spyOn($location, 'path');
            $scope.closeUpdateView();
        });
        it('cancel is ok', function () {
            expect($location.path).toHaveBeenCalledWith('/goodsManage');
        });
    });
});

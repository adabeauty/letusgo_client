// 'use strict';
describe('payList test: ', function () {

    beforeEach(module('letusgoApp'));

    var $scope, BoughtGoodsService, localStorageService, $controller;

    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        BoughtGoodsService = $injector.get('BoughtGoodsService');
        localStorageService = $injector.get('localStorageService');

        $controller = $injector.get('$controller');

        creatPayListCtrl = function () {

            return $controller('PayListCtrl', {
                $scope: $scope,
                BoughtGoodsService: BoughtGoodsService,
                localStorageService: localStorageService
            });
        }

    }));

    describe('localStorageService', function () {

        beforeEach(function () {
            spyOn(localStorageService, 'get');
            spyOn(BoughtGoodsService, 'getboughtGoodsLength');
            spyOn(BoughtGoodsService, 'getTotalMoney');

            spyOn(BoughtGoodsService, 'clearDate');
            spyOn($scope, "$emit");
            creatPayListCtrl();

        });

        it('localStorageService.get is ok', function () {

            expect(localStorageService.get).toHaveBeenCalled();
            expect(BoughtGoodsService.getboughtGoodsLength).toHaveBeenCalled();
            expect(BoughtGoodsService.getTotalMoney).toHaveBeenCalled();

            $scope.clearDate();
            expect(BoughtGoodsService.clearDate).toHaveBeenCalled();
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-clearClickCount');

        });

    });


});

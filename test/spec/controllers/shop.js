// 'use strict';
describe('Controller: ShopCtrl', function () {

    beforeEach(module('letusgoApp'));

    var $scope, BoughtGoodsService, localStorageService, $controller, creatShopCtrl;

    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        BoughtGoodsService = $injector.get('BoughtGoodsService');
        localStorageService = $injector.get('localStorageService');

        $controller = $injector.get('$controller');

        creatShopCtrl = function () {

            return $controller('ShopCtrl', {
                $scope: $scope,
                BoughtGoodsService: BoughtGoodsService,
                localStorageService: localStorageService
            });
        };
    }));

    describe('items list', function () {

        beforeEach(function () {

            spyOn(localStorageService, 'get');
            spyOn($scope, '$emit');

            creatShopCtrl();

        });
        it('should get length goods', function () {

            expect(localStorageService.get).toHaveBeenCalledWith('allGoods');
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-inshop');
        });

    });

    var item;
    describe('add cart number', function () {

        beforeEach(function () {

            item = {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'};

            spyOn(BoughtGoodsService, 'addCartNum');

            creatShopCtrl();
        });

        it('add cart', function () {

            spyOn($scope, '$emit');
            $scope.addCartNum(item);

            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 1, 1);
            expect(BoughtGoodsService.addCartNum).toHaveBeenCalledWith(item);

        });
    });


});

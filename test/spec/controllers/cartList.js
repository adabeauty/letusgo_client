'use strict';
describe('cartList test: ', function () {

    beforeEach(module('letusgoApp'));

    var $scope, BoughtGoodsService, localStorageService, $controller, creatCartListCtrl;

    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        BoughtGoodsService = $injector.get('BoughtGoodsService');
        localStorageService = $injector.get('localStorageService');

        $controller = $injector.get('$controller');

        creatCartListCtrl = function () {

            return $controller('CartListCtrl', {
                $scope: $scope,
                BoughtGoodsService: BoughtGoodsService,
                localStorageService: localStorageService
            });
        }
    }));

    describe('outside', function () {
        beforeEach(function () {

            spyOn($scope, '$emit');
            spyOn(BoughtGoodsService, 'generateCartGoods');
            spyOn(BoughtGoodsService, 'getTotalMoney');
            spyOn(localStorageService, 'get');
            creatCartListCtrl();
        });

        it('outside is ok', function () {
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-incart');
            expect(BoughtGoodsService.generateCartGoods).toHaveBeenCalled();
            expect(BoughtGoodsService.getTotalMoney).toHaveBeenCalled();
            expect(localStorageService.get).toHaveBeenCalled();
        });
    });

    var cartItem, direction;
    describe('modifyCartItemNum :', function () {
        beforeEach(function () {

            creatCartListCtrl();
            cartItem = {num: 1, item: {category: '饮料类', naem: '可口可乐', price: '3.00', unit: '瓶'}};
            direction = 1;
        });

        it('modifyCartItemNum is ok', function () {

            spyOn(BoughtGoodsService, 'modifyCartItemNum');
            spyOn($scope, '$emit');
            spyOn(BoughtGoodsService, 'generateCartGoods');
            spyOn(BoughtGoodsService, 'getTotalMoney');
            spyOn(localStorageService, 'get');

            $scope.modifyCartItemNum(cartItem, direction);

            expect(BoughtGoodsService.modifyCartItemNum).toHaveBeenCalled();
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 1, 1);
            expect(BoughtGoodsService.generateCartGoods).toHaveBeenCalled();
            expect(BoughtGoodsService.getTotalMoney).toHaveBeenCalled();
            expect(localStorageService.get).toHaveBeenCalled();
        });
    });

    describe('modifyCartItemNum :', function () {
        beforeEach(function () {

            creatCartListCtrl();
            cartItem = {num: 1, item: {category: '饮料类', naem: '可口可乐', price: '3.00', unit: '瓶'}};

        });

        it('modifyCartItemNum is ok', function () {

            spyOn(BoughtGoodsService, 'deleteItem');
            spyOn($scope, '$emit');
            spyOn(BoughtGoodsService, 'generateCartGoods');
            spyOn(BoughtGoodsService, 'getTotalMoney');
            spyOn(localStorageService, 'get');

            $scope.deleteItem(cartItem, direction);

            expect(BoughtGoodsService.deleteItem).toHaveBeenCalled();
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 0, 1);
            expect(BoughtGoodsService.generateCartGoods).toHaveBeenCalled();
            expect(BoughtGoodsService.getTotalMoney).toHaveBeenCalled();
            expect(localStorageService.get).toHaveBeenCalled();
        });
    });

});

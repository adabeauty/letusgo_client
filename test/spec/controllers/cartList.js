'use strict';
describe('cartList test:', function () {

    beforeEach(module('letusgoApp'));

    var $scope, BoughtGoodsService, $controller, creatCartListCtrl;

    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        BoughtGoodsService = $injector.get('BoughtGoodsService');

        $controller = $injector.get('$controller');

        creatCartListCtrl = function () {

            return $controller('CartListCtrl', {
                $scope: $scope,
                BoughtGoodsService: BoughtGoodsService
            });
        }
    }));


    describe('outside params', function () {
        var refresh;
        beforeEach(function () {
            spyOn($scope, '$emit');
//            refresh = jasmine.createSpy('refresh');
            creatCartListCtrl();
        });
        it('has correct value', function () {
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-incart');
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 1, 0);
//            expect(refresh).toHaveBeenCalled();
        });
    });
    describe('modifyItem ', function(){

        var originalTimeout;
        var direction, cartItem;

        beforeEach(function() {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            creatCartListCtrl();
            spyOn(BoughtGoodsService, 'modifyCartItemNum');
//            spyOn($scope, '$emit');
            $scope.modifyCartItemNum(cartItem, direction);
        });

        it("can work", function(done) {
            setTimeout(function() {
//                BoughtGoodsService.modifyCartItemNum();
                done();
            }, 9000);

            expect(BoughtGoodsService.modifyCartItemNum).toHaveBeenCalled();
//            expect($scope.emit).toHaveBeenCalledWith('to-parent-changeClickCount', direction, 1);
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });

    describe('deleteItem', function(){

        var cartItem = {num: 1, item: {Id: 1, name: '可乐', price: 3.50, unit: '瓶'}};
        beforeEach(function(){
            creatCartListCtrl();
            spyOn(BoughtGoodsService, 'deleteItem');
            spyOn($scope, '$emit');

            $scope.deleteItem(cartItem);

        });
        it('can work', function(){
            expect(BoughtGoodsService.deleteItem).toHaveBeenCalled();
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 0, cartItem.num);
        });
    });

});

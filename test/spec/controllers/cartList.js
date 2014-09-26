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

    describe('refresh', function(){
       beforeEach(function(){

           var object = {
               cartGoods: [{name:'可口可乐', num: 1, category: 'drinks'}],
               totalAmount: 40,
               totalCount: 3
           };
           spyOn(BoughtGoodsService, 'refreshData').and.callFake(function(callback){
              callback(object);
           });
           creatCartListCtrl();
       });
        it('should give value to params in view',function(){
            BoughtGoodsService.refreshData(function(data){
                expect($scope.cartGoods.length).toBe(1);
                expect($scope.totalAmount).toBe(40);
                expect($scope.totalCount).toBe(3);

            });
        });

//        expect(BoughtGoodsService.refreshData).toHaveBeenCalled();
    });
    describe('outside params', function () {
        var refresh;
        beforeEach(function () {
            spyOn($scope, '$emit');
            refresh = jasmine.createSpy('refresh');
//            refresh();
            creatCartListCtrl();
        });
        it('has correct value', function () {
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-incart');
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 1, 0);
//            expect(refresh).toHaveBeenCalled();
        });
    });
    describe('modifyItem', function(){
        var direction, cartItem;
        beforeEach(function(){
           creatCartListCtrl();
           spyOn(BoughtGoodsService, 'modifyCartItemNum');
           spyOn($scope, '$emit');
           $scope.modifyCartItemNum(cartItem, direction);
        });
        it('should work',function(){
            BoughtGoodsService.modifyCartItemNum(cartItem, direction, function(){
               expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', direction, 1);
           });
           expect(BoughtGoodsService.modifyCartItemNum).toHaveBeenCalled();
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

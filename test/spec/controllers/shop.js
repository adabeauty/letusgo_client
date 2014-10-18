'use strict';
describe('Controller: ShopCtrl', function () {

    beforeEach(module('letusgoApp'));

    var $scope, BoughtGoodsService, $http, $httpBackend, localStorageService, $controller, creatShopCtrl;

    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        BoughtGoodsService = $injector.get('BoughtGoodsService');
        localStorageService = $injector.get('localStorageService');

        $controller = $injector.get('$controller');
        creatShopCtrl = function () {

            return $controller('ShopCtrl', {
                $scope: $scope,
                BoughtGoodsService: BoughtGoodsService,
                localStorageService: localStorageService,
                $http: $http
            });
        };
    }));
    beforeEach(function(){
        var item = {name:'可口可乐', category: 'drinks', price: 3.50, num:1};
        spyOn($scope, '$emit');
        $httpBackend.when('GET', '/api/goods').respond(item);
        creatShopCtrl();
    });

    describe('outside function', function(){
        it('should work', function(){
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-inshop');
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 1, 0);

            $http.get('/api/goods').success(function(goods){
              expect($scope.allItems.category).toEqual('drinks');
            });
            $httpBackend.expectGET('/api/goods');
            $httpBackend.flush();
        });
    });

    describe('addCartNum', function () {

        var item = {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'};
        beforeEach(function () {
            spyOn(BoughtGoodsService, 'addCartNum');
            $scope.addCartNum(item);
        });
        it('should work', function () {
            BoughtGoodsService.addCartNum(item, function(){
               expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 1, 1);
            });
            expect(BoughtGoodsService.addCartNum).toHaveBeenCalled();
        });
    });

});

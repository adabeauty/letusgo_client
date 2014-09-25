'use strict';
describe('payList test: ', function () {

    beforeEach(module('letusgoApp'));

    var $scope, BoughtGoodsService, $http, $httpBackend, localStorageService, $controller, creatPayListCtrl;

    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        BoughtGoodsService = $injector.get('BoughtGoodsService');
        localStorageService = $injector.get('localStorageService');

        $controller = $injector.get('$controller');
        creatPayListCtrl = function () {

            return $controller('PayListCtrl', {
                $scope: $scope,
                BoughtGoodsService: BoughtGoodsService,
                localStorageService: localStorageService,
                $http: $http
            });
        }

    }));
    beforeEach(function(){
        spyOn($scope, '$emit');
        $httpBackend.when('GET', '/api/cart').respond([{}, {}, {}]);
        creatPayListCtrl();
    });
    describe('outside function', function(){
        beforeEach(function(){
            spyOn(BoughtGoodsService, 'getTotalMoney');
        });
        it('should work', function(){
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 1, 0);
//            expect(BoughtGoodsService.getTotalMoney).toHaveBeenCalled();
            $httpBackend.expectGET('/api/cart');
            $httpBackend.flush();
        });
    });
    describe('clearData', function () {

        beforeEach(function () {
            spyOn(BoughtGoodsService, 'clearDate');
            $scope.clearDate();
        });
        it('should work', function () {
            expect(BoughtGoodsService.clearDate).toHaveBeenCalled();
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-clearClickCount');
        });
    });


});

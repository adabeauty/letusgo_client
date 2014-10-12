'use strict';
describe('test index :', function () {

    beforeEach(module('letusgoApp'));

    var $scope, $rootScope, BoughtGoodsService, localStorageService, $controller, creatclickCountCtrl;

    beforeEach(inject(function ($injector) {

        $rootScope = $injector.get('$rootScope');
        $scope = $injector.get('$rootScope').$new();
        BoughtGoodsService = $injector.get('BoughtGoodsService');
        localStorageService = $injector.get('localStorageService');

        $controller = $injector.get('$controller');

        creatclickCountCtrl = function () {

            return $controller('clickCountCtrl', {
                $scope: $scope,
                BoughtGoodsService: BoughtGoodsService,
                localStorageService: localStorageService
            });
        }
    }));

    describe('to-parent-navigator-inmain function', function () {
        beforeEach(function () {
            creatclickCountCtrl();
        });
        it('should work', function () {

            $scope.$digest();
            $rootScope.$broadcast('to-parent-navigator-inmain');
            expect($scope.home).toEqual(true);

        });
    });

    describe('to-parent-navigator-inshop function', function () {
        beforeEach(function () {
            creatclickCountCtrl();
        });
        it('should work', function () {

            $scope.$digest();
            $rootScope.$broadcast('to-parent-navigator-inshop');
            expect($scope.shop).toEqual(true);

        });
    });

    describe('to-parent-navigator-incategoryManage function', function () {
        beforeEach(function () {
            creatclickCountCtrl();
        });
        it('should work', function () {

            $scope.$digest();
            $rootScope.$broadcast('to-parent-navigator-incategoryManage');
            expect($scope.categoryManage).toEqual(true);

        });
    });

    describe('to-parent-navigator-ingoodsManage function', function () {
        beforeEach(function () {
            creatclickCountCtrl();
        });
        it('should work', function () {

            $scope.$digest();
            $rootScope.$broadcast('to-parent-navigator-ingoodsManage');
            expect($scope.goodsManage).toEqual(true);

        });
    });

    describe('to-parent-navigator-incart function', function () {
        beforeEach(function () {
            creatclickCountCtrl();
        });
        it('should work', function () {

            $scope.$digest();
            $rootScope.$broadcast('to-parent-navigator-incart');
            expect($scope.cart).toEqual(true);

        });
    });

    xdescribe('to-parent-changeClickCount', function () {
        beforeEach(function () {
            creatclickCountCtrl();

            var clickCount = 10;
            spyOn(BoughtGoodsService, 'addClickcount').and.callFake(function(callback){
                callback(clickCount);
            });
        });
        it('to-parent-changeClickCount is ok', function () {
            $scope.$digest();
            $rootScope.$broadcast('to-parent-changeClickCount');
            expect(BoughtGoodsService.addClickcount).toHaveBeenCalled();
            expecct($scope.clickCount).toBe(10);

        });
    });

    describe('to-parent-clearClickCount', function () {
        beforeEach(function () {
            creatclickCountCtrl();
        });
        it('to-parent-clearClickCount is ok', function () {
            $scope.$digest();
            $rootScope.$broadcast('to-parent-clearClickCount');
            expect($scope.clickcount).toBe(0);

        });
    });
});

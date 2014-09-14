// 'use strict';
describe('test goodsManage:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, localStorageService, goodsManageService, $controller, creatGoodsCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        localStorageService = $injector.get('localStorageService');
        goodsManageService = $injector.get('goodsManageService');

        $controller = $injector.get('$controller');

        creatGoodsCtrl = function () {
            return $controller('GoodsCtrl', {
                $scope: $scope,
                $location: $location,
                localStorageService: localStorageService,
                goodsManageService: goodsManageService
            });
        }
    }));

    beforeEach(function () {
        spyOn(localStorageService, 'get');
        spyOn($scope, '$emit');

        creatGoodsCtrl();
    });

    describe('test $scope.allGoods', function () {
        it('ok', function () {
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-ingoodsManage');
            expect(localStorageService.get).toHaveBeenCalledWith('allGoods');
        });
    });

    describe('test editButton:', function () {
        var item;
        beforeEach(function () {
            spyOn(localStorageService, 'set');
            spyOn($location, 'path');

            item = {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'};
            $scope.editButton(item);
        });
        it('editButton is ok', function () {
            expect(localStorageService.set).toHaveBeenCalledWith('updateItem', item);
            expect($location.path).toHaveBeenCalledWith('/goodsUpdate');
        });
    });
    describe('test deleteButton:', function () {
        var item;
        beforeEach(function () {
            item = {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'};
            spyOn(goodsManageService, 'deleteButton');

            $scope.deleteButton(item);
        });

        it('deleteButton', function () {

            expect(goodsManageService.deleteButton).toHaveBeenCalledWith(item);
            expect(localStorageService.get).toHaveBeenCalledWith('allGoods');  //应该被调用两次
        });
    });

    describe('test addButton:', function () {
        beforeEach(function () {
            spyOn($location, 'path');
            $scope.addButton();
        });
        it('addButton', function () {
            expect($location.path).toHaveBeenCalledWith('/goodsAdd');
        });
    });
});

'use strict';
angular.module('letusgoApp')
    .controller('GoodsAddCtrl', function ($scope, $location, localStorageService, goodsManageService) {
//    .controller('GoodsAddCtrl', function ($scope, $location, localStorageService, goodsManageService) {

        $scope.allCategories = goodsManageService.getAllCategories();
        $scope.saveButton = function () {

            goodsManageService.saveButton($scope.itemCategory, $scope.itemName, $scope.itemPrice, $scope.itemUnit);
            $scope.allItems = localStorageService.get('allGoods');
        };

        $scope.cancel = function () {
            $location.path('/goodsManage');
        };
    });

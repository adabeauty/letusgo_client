'use strict';
angular.module('letusgoApp')
    .controller('GoodsAddCtrl', function ($scope, $location, localStorageService, GoodService) {

        $scope.allCategories = GoodService.getAllCategories();
        $scope.saveButton = function () {

            GoodService.saveButton($scope.itemCategory, $scope.itemName, $scope.itemPrice, $scope.itemUnit);
            $scope.allItems = localStorageService.get('allGoods');
        };

        $scope.cancel = function () {
            $location.path('/goodsManage');
        };
    });

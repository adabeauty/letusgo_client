'use strict';
angular.module('letusgoApp')
    .controller('GoodsAddCtrl', function ($scope, $location, localStorageService, GoodService, $http) {

        GoodService.getAllCategories(function(categoryNames){
            $scope.allCategories = categoryNames;
        });

        $scope.saveButton = function () {

            GoodService.saveButton($scope.itemCategory, $scope.itemName, $scope.itemPrice, $scope.itemUnit);

            $http.get('/api/goods').success(function(goods){
                $scope.allItems = goods;
            });
        };

        $scope.closeGoodsView = function () {
            $location.path('/goodsManage');
        };
    });

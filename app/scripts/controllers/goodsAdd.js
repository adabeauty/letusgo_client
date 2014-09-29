'use strict';
angular.module('letusgoApp')
    .controller('GoodsAddCtrl', function ($scope, $location, localStorageService, GoodService, $http) {

        GoodService.getAllCategories(function(categoryNames){
            $scope.allCategories = categoryNames;
        });

        $scope.saveNewGood = function () {

            GoodService.saveNewGood($scope.itemCategory, $scope.itemName, $scope.itemPrice, $scope.itemUnit, function(){
                $location.path('/goodsManage');
            });
            $http.get('/api/goods').success(function(goods){
                $scope.allItems = goods;
            });
        };

        $scope.closeAddView = function () {
            $location.path('/goodsManage');
        };
    });

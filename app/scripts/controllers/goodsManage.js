'use strict';

angular.module('letusgoApp')
    .controller('GoodsCtrl', function ($scope, $location, localStorageService, GoodService, $http) {

        $scope.$emit('to-parent-navigator-ingoodsManage');
        $scope.$emit('to-parent-changeClickCount', 1, 0);

        $http.get('/api/goods').success(function(data){
            $scope.allGoods = data;
            localStorageService.set('allGoods', data);
        });

        $scope.editButton = function (item) {
            localStorageService.set('updateItem', item);
            $location.path('/goodsUpdate');
        };

        $scope.deleteButton = function (item) {

            GoodService.deleteButton(item);
            $scope.allGoods = localStorageService.get('allGoods');
        };
        $scope.addButton = function () {

            $location.path('/goodsAdd');
        };
    });

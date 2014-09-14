'use strict';

angular.module('letusgoApp')
    .controller('GoodsCtrl', function ($scope, $location, localStorageService, goodsManageService) {

        $scope.$emit('to-parent-navigator-ingoodsManage');
        $scope.allGoods = localStorageService.get('allGoods');

        $scope.editButton = function (item) {
            localStorageService.set('updateItem', item);
            $location.path('/goodsUpdate');
        };

        $scope.deleteButton = function (item) {

            goodsManageService.deleteButton(item);
            $scope.allGoods = localStorageService.get('allGoods');
        };
        $scope.addButton = function () {

            $location.path('/goodsAdd');
        };
    });

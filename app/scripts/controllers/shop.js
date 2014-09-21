'use strict';

angular.module('letusgoApp')
    .controller('ShopCtrl', function ($scope, BoughtGoodsService, localStorageService) {

        $scope.$emit('to-parent-navigator-inshop');
        $scope.$emit('to-parent-changeClickCount', 1, 0);

        $scope.allItems = localStorageService.get('allGoods');

        $scope.addCartNum = function (item) {

            BoughtGoodsService.addCartNum(item);
            $scope.$emit('to-parent-changeClickCount', 1, 1);
        };

    });

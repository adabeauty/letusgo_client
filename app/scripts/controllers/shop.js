'use strict';

angular.module('letusgoApp')
    .controller('ShopCtrl', function ($scope, BoughtGoodsService, localStorageService) {

        $scope.$emit('to-parent-navigator-inshop');

        $scope.allItems = localStorageService.get('allGoods');
        $scope.addCartNum = function (item) {

            $scope.$emit('to-parent-changeClickCount', 1, 1);
            BoughtGoodsService.addCartNum(item);
        };

    });

'use strict';

angular.module('letusgoApp')
    .controller('PayListCtrl', function ($scope, BoughtGoodsService, localStorageService) {

        $scope.boughtGoods = localStorageService.get('boughtGoods');
        $scope.boughtGoodsLength = BoughtGoodsService.getboughtGoodsLength();
        $scope.totalMoney = BoughtGoodsService.getTotalMoney();

        $scope.clearDate = function () {

            BoughtGoodsService.clearDate();
            $scope.$emit('to-parent-clearClickCount');
        };
    });

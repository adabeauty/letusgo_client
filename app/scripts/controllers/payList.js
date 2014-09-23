'use strict';

angular.module('letusgoApp')
    .controller('PayListCtrl', function ($scope, BoughtGoodsService, localStorageService, $http) {

        $http.get('/api/boughtGoods').success(function(data){

            $scope.boughtGoods = data;
            $scope.boughtGoodsLength = data.length;
            $scope.totalMoney = BoughtGoodsService.getTotalMoney(data);;
        });

        $scope.clearDate = function () {

            BoughtGoodsService.clearDate();
            $scope.$emit('to-parent-clearClickCount');
        };
    });

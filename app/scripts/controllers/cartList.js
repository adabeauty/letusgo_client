'use strict';

angular.module('letusgoApp')
    .controller('CartListCtrl', function ($scope, BoughtGoodsService) {

        function refresh(){
            BoughtGoodsService.refreshData(function(data){

                $scope.cartGoods = data.cartGoods;
                $scope.totalAmount = data.totalAmount;
                $scope.totalCount = data.totalCount;

            });
        }

        refresh();
        $scope.$emit('to-parent-changeClickCount', 1, 0);
        $scope.$emit('to-parent-navigator-incart');

        $scope.modifyCartItemNum = function (cartItem, direction) {
            BoughtGoodsService.modifyCartItemNum(cartItem, direction, function(){
                $scope.$emit('to-parent-changeClickCount', direction, 1);
                refresh();
            });
        };

        $scope.deleteItem = function (cartItem) {
            BoughtGoodsService.deleteItem(cartItem);
            $scope.$emit('to-parent-changeClickCount', 0, cartItem.num);
            refresh();
        };

    });

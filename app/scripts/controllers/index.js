'use strict';

angular.module('letusgoApp')
    .controller('clickCountCtrl', function ($scope, BoughtGoodsService, localStorageService) {

        function highlight(home, shop, categoryManage, goodsManage, cart){
            $scope.home = home;
            $scope.shop = shop;
            $scope.categoryManage = categoryManage;
            $scope.goodsManage = goodsManage;
            $scope.cart = cart;
        }

        $scope.clickcount = +localStorageService.get('clickcount');

        $scope.$on('to-parent-navigator-inmain', function () {
            highlight(true, false, false, false, false);
        });

        $scope.$on('to-parent-navigator-inshop', function () {
              highlight(false, true, false, false, false);
        });

        $scope.$on('to-parent-navigator-incategoryManage', function () {
              highlight(false, false, true, false, false);
        });

        $scope.$on('to-parent-navigator-ingoodsManage', function () {
            highlight(false, false, false, true, false);
        });

        $scope.$on('to-parent-navigator-incart', function () {
            highlight(false, false, false, false, true);
        });

        $scope.$on('to-parent-changeClickCount', function (changeClickCount, addDirection, number) {

            BoughtGoodsService.addClickcount(addDirection, number,function(data){
                $scope.clickcount = data;
            });
        });

        $scope.$on('to-parent-clearClickCount', function () {

            $scope.clickcount = 0;
        });

    });

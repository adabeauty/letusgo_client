'use strict';

angular.module('letusgoApp')
    .controller('GoodsCtrl', function ($scope, $location, localStorageService, GoodService, $http) {

        function getGoods(){
            $http.get('/api/goods').success(function(data){
                $scope.allGoods = data;
            });
        }

        getGoods();
        $scope.$emit('to-parent-navigator-ingoodsManage');
        $scope.$emit('to-parent-changeClickCount', 1, 0);

        $scope.editButton = function (item) {
            localStorageService.set('updateItem', item);
            $location.path('/goodsUpdate');
        };

        $scope.deleteButton = function (item) {
            GoodService.deleteButton(item);
            getGoods();
        };
        $scope.addButton = function () {

            $location.path('/goodsAdd');
        };
    });

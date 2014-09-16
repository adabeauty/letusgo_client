angular.module('letusgoApp')
    .controller('GoodsUpdateCtrl', function ($scope, $location, localStorageService, GoodService) {

        $scope.updateObject = localStorageService.get('updateItem');

        $scope.updateItem = function () {

            localStorageService.set('updateItem', $scope.updateObject);
            GoodService.updateItem();
            $location.path('/goodsManage');
        };

        $scope.cancel = function () {
            $location.path('/goodsManage');
        };
    });

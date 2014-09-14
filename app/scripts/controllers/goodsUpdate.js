angular.module('letusgoApp')
    .controller('GoodsUpdateCtrl', function ($scope, $location, localStorageService, goodsUpdateService) {

        $scope.updateObject = localStorageService.get('updateItem');

        $scope.updateItem = function () {

            localStorageService.set('updateItem', $scope.updateObject);
            goodsUpdateService.updateItem();
            $location.path('/goodsManage');
        };

        $scope.cancel = function () {
            $location.path('/goodsManage');
        };
    });

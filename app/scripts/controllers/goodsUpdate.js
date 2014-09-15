angular.module('letusgoApp')
    .controller('GoodsUpdateCtrl', function ($scope, $location, localStorageService, goodsManageService) {

        $scope.updateObject = localStorageService.get('updateItem');

        $scope.updateItem = function () {

            localStorageService.set('updateItem', $scope.updateObject);
            goodsManageService.updateItem();
            $location.path('/goodsManage');
        };

        $scope.cancel = function () {
            $location.path('/goodsManage');
        };
    });

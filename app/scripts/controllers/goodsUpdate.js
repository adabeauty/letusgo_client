angular.module('letusgoApp')
    .controller('GoodsUpdateCtrl', function ($scope, $location, localStorageService, GoodService) {

        $scope.updateObject = localStorageService.get('updateItem');

        $scope.updateItem = function () {

            GoodService.updateItem($scope.updateObject);
            $location.path('/goodsManage');

        };

        $scope.closeUpdateView = function () {
            $location.path('/goodsManage');
        };
    });

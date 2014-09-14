'use strict';

angular.module('letusgoApp')
    .controller('CategoryUpdateCtrl', function ($scope, $location, localStorageService, cagtegoryUpdateService) {

        $scope.updateObject = localStorageService.get('updateCategory');

        $scope.updateCategory = function () {

            localStorageService.set('updateCategory', $scope.updateObject);
            cagtegoryUpdateService.updateCategory();
            $location.path('/categoryManage');

        };
        $scope.cancel = function () {
            $location.path('/categoryManage');
        };
    });

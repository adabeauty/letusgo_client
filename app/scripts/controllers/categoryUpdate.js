'use strict';

angular.module('letusgoApp')
    .controller('CategoryUpdateCtrl', function ($scope, $location, localStorageService, CategoryService) {

        $scope.updateObject = localStorageService.get('updateCategory');

        $scope.updateCategory = function () {

            localStorageService.set('updateCategory', $scope.updateObject);
            CategoryService.updateCategory(function(){
                $location.path('/categoryManage');
            });
        };
        $scope.cancel = function () {
            $location.path('/categoryManage');
        };
    });

'use strict';

angular.module('letusgoApp')
    .controller('CategoryAddCtrl', function ($scope, $location, CategoryService) {

        $scope.saveButton = function () {

            CategoryService.saveButton($scope.currentName);
        };

        $scope.cancel = function () {
            $location.path('/categoryManage');
        };
    });

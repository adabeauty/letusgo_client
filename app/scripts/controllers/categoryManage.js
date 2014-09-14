'use strict';

angular.module('letusgoApp')
    .controller('CategoryCtrl', function ($scope, categoryManageService, localStorageService) {

        $scope.$emit('to-parent-navigator-incategoryManage');
        $scope.category = localStorageService.get('category');

        $scope.editButton = function (categoryDetail) {

            localStorageService.set('updateCategory', categoryDetail);
        };

        $scope.deleteButton = function (every) {

            categoryManageService.deleteButton(every);
            $scope.category = localStorageService.get('category');

        };
    });

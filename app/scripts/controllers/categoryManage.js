'use strict';

angular.module('letusgoApp')
    .controller('CategoryCtrl', function ($scope, CategoryService, localStorageService) {

        $scope.$emit('to-parent-navigator-incategoryManage');
        $scope.$emit('to-parent-changeClickCount', 1, 0);

        $scope.category = localStorageService.get('category');

        $scope.editButton = function (categoryDetail) {

            localStorageService.set('updateCategory', categoryDetail);
        };

        $scope.deleteButton = function (every) {

            CategoryService.deleteButton(every);
            $scope.category = localStorageService.get('category');

        };
    });

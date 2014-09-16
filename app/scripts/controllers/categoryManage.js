'use strict';

angular.module('letusgoApp')
    .controller('CategoryCtrl', function ($scope, CategoryService, localStorageService) {

        $scope.$emit('to-parent-navigator-incategoryManage');
        $scope.category = localStorageService.get('category');

        $scope.editButton = function (categoryDetail) {

            localStorageService.set('updateCategory', categoryDetail);
        };

        $scope.deleteButton = function (every) {

            CategoryService.deleteButton(every);
            $scope.category = localStorageService.get('category');

        };
    });

'use strict';

angular.module('letusgoApp')
    .controller('CategoryCtrl', function ($scope, CategoryService, localStorageService, $http) {

        $scope.$emit('to-parent-navigator-incategoryManage');
        $scope.$emit('to-parent-changeClickCount', 1, 0);

//        $scope.category = localStorageService.get('category');
        $http.get('/api/categories').success(function(data){
            $scope.category = data;
            localStorageService.set('category', data);
        });
        $scope.editButton = function (categoryDetail) {

            localStorageService.set('updateCategory', categoryDetail);
        };

        $scope.deleteButton = function (every) {

            CategoryService.deleteButton(every);
            $scope.category = localStorageService.get('category');

        };
    });

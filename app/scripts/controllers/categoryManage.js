'use strict';

angular.module('letusgoApp')
    .controller('CategoryCtrl', function ($scope, CategoryService, localStorageService, $http) {

        function getCtegories(){
            $http.get('/api/categories').success(function(data){
                $scope.category = data;
            });
        }
        
        $scope.$emit('to-parent-navigator-incategoryManage');
        $scope.$emit('to-parent-changeClickCount', 1, 0);
        getCtegories();

        $scope.editButton = function (categoryDetail) {

            localStorageService.set('updateCategory', categoryDetail);
        };

        $scope.deleteButton = function (every) {

            CategoryService.deleteButton(every);
            getCtegories();

        };
    });

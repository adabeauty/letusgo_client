'use strict';

angular.module('letusgoApp')
    .controller('CategoryAddCtrl', function ($scope, $location, CategoryService) {

//        CategoryService.getCurrentID(function(ID){
//            $scope.currentID = ID;
//        });

        $scope.saveButton = function () {

//            CategoryService.saveButton($scope.currentID, $scope.currentName);
            CategoryService.saveButton($scope.currentName);
        };

        $scope.cancel = function () {
            $location.path('/categoryManage');
        };
    });

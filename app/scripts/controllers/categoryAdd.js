'use strict';

angular.module('letusgoApp')
    .controller('CategoryAddCtrl', function ($scope, $location, CategoryService) {

        $scope.saveNewCategory = function () {
            CategoryService.saveNewCategory($scope.currentName, function(warning){
                    $scope.undefinedCategory = warning[0];
                    $scope.repeatedCategory = warning[1];

                    var skip = warning[0] === false && warning[1] ===false;
                    if(skip){
                        $location.path('/categoryManage');
                    }
                });
        };

        $scope.cancel = function () {
            $location.path('/categoryManage');
        };
    });

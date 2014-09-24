'use strict';
describe('test goodsManage:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $location, $http, $httpBackend, localStorageService, GoodService, $controller, creatGoodsCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        localStorageService = $injector.get('localStorageService');
        GoodService = $injector.get('GoodService');

        $controller = $injector.get('$controller');

        creatGoodsCtrl = function () {
            return $controller('GoodsCtrl', {
                $scope: $scope,
                $location: $location,
                localStorageService: localStorageService,
                GoodService: GoodService,
                $http: $http
            });
        }
    }));

    beforeEach(function () {
        spyOn($scope, '$emit');
        $httpBackend.when('GET', '/api/goods').respond([{}, {}, {}]);
        creatGoodsCtrl();
    });
    describe('outside function', function(){
        it('should work', function(){
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-ingoodsManage');
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 1, 0);
            $httpBackend.expectGET('/api/goods');
            $httpBackend.flush();
        });
    });

    var item = {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'};
    describe('test editButton:', function () {

        beforeEach(function () {
            spyOn(localStorageService, 'set');
            spyOn($location, 'path');
            $scope.editButton(item);
        });
        it('editButton is ok', function () {
            expect(localStorageService.set).toHaveBeenCalledWith('updateItem', item);
            expect($location.path).toHaveBeenCalledWith('/goodsUpdate');
        });
    });

    describe('test deleteButton:', function () {
        beforeEach(function () {
            spyOn(GoodService, 'deleteButton');
            $scope.deleteButton(item);
        });
        it('deleteButton', function () {
            expect(GoodService.deleteButton).toHaveBeenCalledWith(item);
        });
    });

    describe('test addButton:', function () {
        beforeEach(function () {
            spyOn($location, 'path');
            $scope.addButton();
        });
        it('addButton', function () {
            expect($location.path).toHaveBeenCalledWith('/goodsAdd');
        });
    });
});

describe('test goodsAdd:', function () {
    beforeEach(module('letusgoApp'));
    var $scope, $location, $http, $httpBackend, localStorageService, GoodService, $controller, creatGoodsAddCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $location = $injector.get('$location');
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        localStorageService = $injector.get('localStorageService');
        GoodService = $injector.get('GoodService');

        $controller = $injector.get('$controller');

        creatGoodsAddCtrl = function () {
            return $controller('GoodsAddCtrl', {
                $scope: $scope,
                $location: $location,
                localStorageService: localStorageService,
                GoodService: GoodService,
                $http: $http
            });
        }
    }));
    describe('outside getAllCategories', function(){
        beforeEach(function(){
            spyOn(GoodService, 'getAllCategories');
            creatGoodsAddCtrl();
        });
        it('should work', function(){
            expect(GoodService.getAllCategories).toHaveBeenCalled();
        });

    });
    describe('test saveButton', function () {
        beforeEach(function () {
            spyOn(GoodService, 'getAllCategories');
            creatGoodsAddCtrl();
            $httpBackend.when('GET', '/api/goods').respond('allItems');
            spyOn(GoodService, 'saveButton');

            $scope.saveButton();
        });
        it('saveButton is ok', function () {
            expect(GoodService.saveButton).toHaveBeenCalledWith($scope.itemCategory, $scope.itemName, $scope.itemPrice, $scope.itemUnit);
            $httpBackend.expectGET('/api/goods');
            $httpBackend.flush();
        });
    });

    describe('test cancel', function () {
        beforeEach(function () {
            creatGoodsAddCtrl();
            spyOn($location, 'path');
            $scope.cancel();
        });
        it('cancel is ok', function () {
            expect($location.path).toHaveBeenCalledWith('/goodsManage');
        });
    });

});

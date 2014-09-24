describe('test categoryManage:', function () {

    beforeEach(module('letusgoApp'));
    var $scope, $http, $httpBackend, CategoryService, localStorageService, $controller, creatCategoryCtrl;
    beforeEach(inject(function ($injector) {

        $scope = $injector.get('$rootScope').$new();
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        CategoryService = $injector.get('CategoryService');
        localStorageService = $injector.get('localStorageService');

        $controller = $injector.get('$controller');
        creatCategoryCtrl = function () {
            return $controller('CategoryCtrl', {
                $scope: $scope,
                CategoryService: CategoryService,
                localStorageService: localStorageService,
                $http: $http
            });
        }
    }));

    describe('outside function', function () {
        beforeEach(function () {
            spyOn($scope, '$emit');
            $httpBackend.when('GET', '/api/categories').respond([{}, {}, {}]);
            creatCategoryCtrl();
        });

        it('should work', function () {
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-navigator-incategoryManage');
            expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeClickCount', 1, 0);
            $httpBackend.expectGET('/api/categories');
            $httpBackend.flush();

        });
    });

    describe('test editButton()', function () {
        var updateObject = {ID: 'TF1001', name: '饮料类', num: '1'};;
        beforeEach(function () {
            creatCategoryCtrl();
            spyOn(localStorageService, 'set');
            $scope.editButton(updateObject );
        });
        it('editButton is ok', function () {
            expect(localStorageService.set).toHaveBeenCalledWith('updateCategory', updateObject);
        });
    });

    describe('test deleteButton()', function () {
        var every = {ID: 'TF1001', name: '饮料类', num: '1'};
        beforeEach(function () {
            creatCategoryCtrl();
            spyOn(CategoryService, 'deleteButton');
            $scope.deleteButton(every);
        });
        it('deleteButton is ok', function () {
            expect(CategoryService.deleteButton).toHaveBeenCalledWith($scope.category, every);
        });
    });


});

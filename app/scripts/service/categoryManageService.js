angular.module('letusgoApp').service('CategoryService', function (localStorageService, $location, $http) {

    this.nameHadExist = function (categories, currentName) {

        var nameExist = _.findIndex(categories, {name: currentName});
        return nameExist;
    };

    this.saveButton = function (currentName) {
        var currentThis = this;
        $http.get('/api/categories').success(function(categories){
            var nameHadExist = currentThis.nameHadExist(categories, currentName);
            if (!currentName) {
                alert('请填写分类名称!');
                return false;
            }
            if (nameHadExist !== -1) {
                alert('此商品分类已经存在,请重新输入!');
                return false;
            } else{
                $http.post('/api/categories', {'newCategory': currentName});
                $location.path('/categoryManage');
                return true;
            }
        });
    };

    this.updateCategory = function (callback) {
        var updateObeject = localStorageService.get('updateCategory');
        $http.put('/api/categories/' + updateObeject.ID, {'category': updateObeject}).success(function(){});
        callback();
    };

    this.deleteButton = function (categories, object) {

        if (object.num !== '0') {
            alert('此分类下有商品存在,不能删除');
            return false;
        } else {
            $http.delete('/api/categories/' + object.ID).success(function(){});
            return true;
        }
    };

});

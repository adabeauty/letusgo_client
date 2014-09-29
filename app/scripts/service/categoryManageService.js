angular.module('letusgoApp').service('CategoryService', function (localStorageService, $http) {

    this.nameHadExist = function (categories, currentName) {

        var nameExist = _.findIndex(categories, {name: currentName});
        return nameExist;
    };

    this.saveNewCategory = function (currentName, callback) {
        var currentThis = this;
        $http.get('/api/categories').success(function(categories){
            var nameHadExist = currentThis.nameHadExist(categories, currentName);
            if (!currentName) {
                callback([true, false]);
                return ;
            }
            if (nameHadExist !== -1) {
                callback([false, true]);
                return ;
            }else{
                $http.post('/api/categories', {'newCategory': currentName});
                callback([false, false]);
            }
        });
    };

    this.updateCategory = function (callback) {
        var updateObeject = localStorageService.get('updateCategory');
        $http.put('/api/categories/' + updateObeject.ID, {'category': updateObeject}).success(function(){});
        callback();
    };

    this.deleteButton = function (categories, object) {

        if (object.num != 0) {
            alert('此分类下有商品存在,不能删除');
            return false;
        } else {
            $http.delete('/api/categories/' + object.ID).success(function(){});
            return true;
        }
    };

});

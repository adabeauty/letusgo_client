angular.module('letusgoApp').service('CategoryService', function (localStorageService, $location, $http) {

    this.category = function (ID, name, num) {
        return {
            ID: ID,
            name: name,
            num: num
        };
    };
    this.getCurrentID = function(callback){

        $http.get('/api/categories').success(function(categories){
            if(categories.length === 0){
                callback(1);
            }else{
                var lastID = categories[categories.length - 1].ID;
                var currentID = JSON.parse(lastID) + 1;
                callback(currentID);
            }
        });
    };

    this.nameHadExist = function (categories, currentName) {

        var nameExist = _.findIndex(categories, {name: currentName});
        return nameExist;
    };
    this.addNewCateogory = function (categories, currentID, currentName) {

        addCategory = this.category(currentID, currentName, '0');
        categories.push(addCategory);
        $http.post('/api/categories', {'categories': categories}).success(function(){});
//        $http.post('/api/categories/' + currentID, {'category': addCategory});
        $location.path('/categoryManage');
    };

    this.saveButton = function (currentID, currentName) {

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
                currentThis.addNewCateogory(categories, currentID, currentName);
//                currentThis.addNewCateogory(currentID, currentName);
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
        } else {
            $http.delete('/api/categories/' + object.ID).success(function(){});
        }
    };

});

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
            console.log(categories);
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

        var current = this.category(currentID, currentName, '0');

        categories.push(current);
        $http.post('/api/categories', {'categories': categories}).success(function(){});

    };

    this.saveButton = function (currentID, currentName) {

        var currentThis = this;
        $http.get('/api/categories').success(function(categories){
            var nameHadExist = currentThis.nameHadExist(categories, currentName);
            if (!currentName) {
                alert('请填写分类名称!');
            }
            if (nameHadExist !== -1) {
                alert('此商品分类已经存在,请重新输入!');
            } else{
                currentThis.addNewCateogory(categories, currentID, currentName);
                $location.path('/categoryManage');
            }
        });
    };

    this.updateCategory = function (callback) {

        $http.get('/api/categories').success(function(categories){

            var updateObeject = localStorageService.get('updateCategory');
            var index = _.findIndex(categories, {'ID': updateObeject.ID});
            categories[index] = updateObeject;
            $http.post('/api/categories', {'categories': categories}).success(function(){});
            callback();
        });

    };

    this.deleteButton = function (categories, object) {

        if (object.num !== '0') {
            alert('此分类下有商品存在,不能删除');
        } else {
            var events = _.remove(categories, function (every) {
                return object.ID === every.ID;
            });
        }
        $http.post('/api/categories', {'categories': categories}).success(function(){});

    };

});

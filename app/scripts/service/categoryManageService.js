angular.module('letusgoApp').service('CategoryService', function (localStorageService, $location, $http) {

    this.category = function (ID, name, num) {
        return {ID: ID, name: name, num: num};
    };
    this.getCurrentID = function(){
        var category = localStorageService.get('category');
        console.log('category:',category);
        if(category.length === 0){
            console.log('category:',category);
            return 1;
        }
        var lastID = category[category.length - 1].ID;
        var currentID = JSON.parse(lastID) + 1;
        return currentID;
    };

    this.nameHadExist = function (currentName) {

        var currentCategory = localStorageService.get('category');
        var nameExist = _.findIndex(currentCategory, {name: currentName});

        return nameExist;
    };
    this.addNewCateogory = function (currentID, currentName) {

        var currentCategory = localStorageService.get('category');
        var noCategory = currentCategory === '' || currentCategory === null;
        if (noCategory) {
            currentCategory = [];
        }

        var current = this.category(currentID, currentName, '0');

        currentCategory.push(current);
        localStorageService.set('category', currentCategory);

    };

    this.saveButton = function (currentID, currentName) {

        var nameHadExist = this.nameHadExist(currentName);
        if (!currentName) {
            alert('请填写分类名称!');
            return false;
        }
        if (nameHadExist !== -1) {
            alert('此商品分类已经存在,请重新输入!');
            return false;
        } else{
            this.addNewCateogory(currentID, currentName);
            $location.path('/categoryManage');
            return true;
        }
    };

    this.updateCategory = function () {

        var updateObeject = localStorageService.get('updateCategory');
        var allCategories = localStorageService.get('category');
        var index = _.findIndex(allCategories, {'ID': updateObeject.ID});
        allCategories[index] = updateObeject;

        localStorageService.set('category', allCategories);
        return index;
    };

    this.deleteButton = function (every) {

        var currentCategory = localStorageService.get('category');

        if (every.num !== 0) {
            alert('此分类下有商品存在,不能删除');
        } else {
            var events = _.remove(currentCategory, function (num) {
                return every.ID === num.ID;
            });
        }
        localStorageService.set('category', currentCategory);

    };

});

'use strict';
angular.module('letusgoApp').service('categoryAddService', function ($location, localStorageService) {


    this.category = function (ID, name, num) {
        return {ID: ID, name: name, num: num};
    };

    this.categoryDetailSuccess = function (categoryID, categoryName) {

        var itemDetailSuccess = categoryID && categoryName;
        return itemDetailSuccess;
    };


    this.IDHasExist = function (currentID) {

        var currentCategory = localStorageService.get('category');
        var idExist = _.findIndex(currentCategory, {ID: currentID});

        return idExist;
    };
    this.nameHadExist = function (currentName) {

        var currentCategory = localStorageService.get('category');
        var nameExist = _.findIndex(currentCategory, {name: currentName});

        return nameExist;
    };
    this.addNewCateogory = function (currentID, currentName) {

        var currentCategory = localStorageService.get('category');

        if (currentCategory === '' || null) {
            currentCategory = [];
        }

        var current = this.category(currentID, currentName, '0');

        currentCategory.push(current);
        localStorageService.set('category', currentCategory);

    };

    this.saveButton = function (currentID, currentName) {

        var IDHasExist = this.IDHasExist(currentID);
        var nameHadExist = this.nameHadExist(currentName);
        var categoryDetailSuccess = this.categoryDetailSuccess(currentID, currentName);

        if (!categoryDetailSuccess) {
            alert('请填写完整商品信息!');
            return false;
        }
        if (IDHasExist !== -1) {
            alert('此ID已经存在,请重新输入ID!');
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
});

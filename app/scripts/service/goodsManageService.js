'use strict';
angular.module('letusgoApp').service('goodsManageService', function ($location, localStorageService) {
    this.item = function (category, name, price, unit) {
        return {category: category, name: name, price: price, unit: unit};
    };

    this.hasExistItem = function (itemName) {

        var currentItems = localStorageService.get('allGoods');
        var exist = _.findIndex(currentItems, {name: itemName});

        return exist;
    };

    this.itemDetailSuccess = function (itemCategory, itemName, itemPrice, itemUnit) {

        var itemDetailSuccess = itemCategory && itemName && itemPrice && itemUnit;
        return itemDetailSuccess;
    };
    this.saveItem = function (itemCategory, itemName, itemPrice, itemUnit) {

        var currentItems = localStorageService.get('allGoods');
        if (currentItems === '' || null) {
            currentItems = [];
        }

        var newItem = this.item(itemCategory, itemName, itemPrice, itemUnit);
        currentItems.push(newItem);
        localStorageService.set('allGoods', currentItems);
    };
    this.addCategoryNum = function (itemCategory) {

        var currentCategory = localStorageService.get('category');
        _.forEach(currentCategory, function (category) {
            if (category.name === itemCategory) {
                return category.num++;
            }
        });

        localStorageService.set('category', currentCategory);
    };

    this.succeedSave = function(name, itemName, itemPrice, itemUnit){
        this.saveItem(name, itemName, itemPrice, itemUnit);
        this.addCategoryNum(name);

        $location.path('/goodsManage');
    };
    this.saveButton = function (itemCategory, itemName, itemPrice, itemUnit) {

        var hasExistItem = this.hasExistItem(itemName);
        var itemDetailSuccess = this.itemDetailSuccess(itemCategory.name, itemName, itemPrice, itemUnit);

        if (!itemDetailSuccess) {
            alert('请填写完整商品信息!');
            return false;
        }
        if (hasExistItem !== -1) {
            alert('此商品已存在,请重新输入!');
            return false;
        } else {
            this.succeedSave(itemCategory.name, itemName, itemPrice, itemUnit);
            return true;
        }

    };

    this.getAllCategories = function () {

        var category = localStorageService.get('category');
        var allCategories = [];
        _(category).forEach(function (num) {
            allCategories.push({name: num.name});
        });
        return allCategories;
    };

    this.updateItem = function () {

        var updateObject = localStorageService.get('updateItem');
        var allGoods = localStorageService.get('allGoods');
        var index = _.findIndex(allGoods, {'name': updateObject.name});
        allGoods[index] = updateObject;

        localStorageService.set('allGoods', allGoods);
        return index;
    };

    this.decreaseCategoryNum = function (item) {

        var currentCategory = localStorageService.get('category');

        _.forEach(currentCategory, function (category) {
            if (category.name === item.category) {
                return category.num--;
            }
        });

        localStorageService.set('category', currentCategory);
    };
    this.deleteButton = function (item) {

        var currentItems = localStorageService.get('allGoods');
        _.remove(currentItems, function (num) {
            return item.name === num.name;
        });
        localStorageService.set('allGoods', currentItems);

        this.decreaseCategoryNum(item);

    };

});

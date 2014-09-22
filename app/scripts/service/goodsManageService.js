'use strict';
angular.module('letusgoApp').service('GoodService', function ($location, localStorageService, $http) {

    function generateId(){
        var currentItems = localStorageService.get('allGoods');
        var Id;
        if(currentItems.length === 0){
            return 1;
        }
        var lastId = currentItems[currentItems.length - 1].Id;
        Id = JSON.parse(lastId) + 1;
        return Id;
    }
    this.item = function (category, name, price, unit) {

        return {
            Id: generateId(),
            category: category,
            name: name,
            price: price,
            unit: unit
        };
    };

    this.hasExistItem = function (itemName, callback) {

//        var currentItems = localStorageService.get('allGoods');
//        var exist = _.findIndex(currentItems, {name: itemName});
//
//        return exist;
        $http.get('/api/goods').success(function(data){
            var exist = _.findIndex(data, {name: itemName});
            callback(exist);
        });

    };

    this.itemDetailSuccess = function (itemCategory, itemName, itemPrice, itemUnit) {

        var itemDetailSuccess = itemCategory && itemName && itemPrice && itemUnit;
        return itemDetailSuccess;
    };
    this.saveItem = function (itemCategory, itemName, itemPrice, itemUnit) {

        var currentItems = localStorageService.get('allGoods');
//        var noItems = currentItems === '' || currentItems === null;
//        if (noItems) {
//            currentItems = [];
//        }
        var newItem = this.item(itemCategory, itemName, itemPrice, itemUnit);
        currentItems.push(newItem);
        localStorageService.set('allGoods', currentItems);
        $http.post('/api/goods', {'goods': currentItems}).success(function(){});
//        var currentThis = this;
//        $http.get('/api/goods').success(function(data){
//            console.log(data);
//            var newItem = currentThis.item(itemCategory, itemName, itemPrice, itemUnit);
//            data.push(newItem);
//            console.log('goods:', data);
//            $http.post('/api/goods', {'goods': data}).success(function(){});
//            localStorageService.set('allGoods', data);
//        });

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

        var currentThis = this;
        this.hasExistItem(itemName, function(hasExistItem){
            var itemDetailSuccess = currentThis.itemDetailSuccess(itemCategory.name, itemName, itemPrice, itemUnit);

            if (!itemDetailSuccess) {
                alert('请填写完整商品信息!');
            }
            if (hasExistItem !== -1) {
                alert('此商品已存在,请重新输入!');
            } else {
                var goods = localStorageService.get('allGoods');
                $http.post('/api/goods', {'goods': goods}).success(function(){
                    currentThis.succeedSave(itemCategory.name, itemName, itemPrice, itemUnit);
                });
//                currentThis.succeedSave(itemCategory.name, itemName, itemPrice, itemUnit);
            }
        });
//        var hasExistItem = this.hasExistItem(itemName);
//        var itemDetailSuccess = this.itemDetailSuccess(itemCategory.name, itemName, itemPrice, itemUnit);
//
//        if (!itemDetailSuccess) {
//            alert('请填写完整商品信息!');
//            return false;
//        }
//        if (hasExistItem !== -1) {
//            alert('此商品已存在,请重新输入!');
//            return false;
//        } else {
//            this.succeedSave(itemCategory.name, itemName, itemPrice, itemUnit);
//            return true;
//        }

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
        $http.get('/api/goods').success(function(data){
            var index = _.findIndex(allGoods, {'name': updateObject.name});
            allGoods[index] = updateObject;
            localStorageService.set('allGoods', allGoods);
            callbak(data);
        });
//        var index = _.findIndex(allGoods, {'name': updateObject.name});
//        allGoods[index] = updateObject;
//
//        localStorageService.set('allGoods', allGoods);
//        return index;
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
//        $http.delete('/apigoods/' + item.Id).success(function(){});
        $http.delete('/api/goods/' + item.Id, {'goods': currentItems}).success(function(){});
        this.decreaseCategoryNum(item);

    };

});

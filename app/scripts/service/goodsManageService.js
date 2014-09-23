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
        var newItem = this.item(itemCategory, itemName, itemPrice, itemUnit);
        currentItems.push(newItem);
        localStorageService.set('allGoods', currentItems);
        $http.post('/api/goods', {'goods': currentItems}).success(function(){});

    };
    this.modifyCategoryNum = function (num, itemCategory) {

        var currentCategory = localStorageService.get('category');
        _.forEach(currentCategory, function (category) {
            if (category.name === itemCategory) {
                return category.num = +category.num + num;
            }
        });
//        $http.post('/api/categories', {'categories': currentCategory}).success(function(){});
        localStorageService.set('category', currentCategory);
    };
    
    this.succeedSave = function(name, itemName, itemPrice, itemUnit){
        this.saveItem(name, itemName, itemPrice, itemUnit);
        this.modifyCategoryNum(1, name);
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
            }
        });

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
    };

    this.deleteButton = function (item) {

        var currentItems = localStorageService.get('allGoods');
        _.remove(currentItems, function (num) {
            return item.name === num.name;
        });
        localStorageService.set('allGoods', currentItems);
        $http.delete('/api/goods/' + item.Id, {'goods': currentItems}).success(function(){});
        this.modifyCategoryNum(-1, item.category);
    };

});

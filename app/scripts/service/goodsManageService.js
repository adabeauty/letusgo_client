'use strict';
angular.module('letusgoApp').service('GoodService', function ($location, localStorageService, $http) {

    function generateId(goods){

        var Id;
        if(goods.length === 0){
            return 1;
        }
        var lastId = goods[goods.length - 1].Id;
        Id = JSON.parse(lastId) + 1;
        return Id;
    }
    this.item = function (goods, category, name, price, unit) {

        return {
            Id: generateId(goods),
            category: category,
            name: name,
            price: price,
            unit: unit
        };
    };

    this.hasExistItem = function (goods, itemName, callback) {

//        $http.get('/api/goods').success(function(data){
//            var exist = _.findIndex(data, {name: itemName});
//            callback(exist);
//        });
        var exist = _.findIndex(goods, {name: itemName});
        return exist;

    };

    this.itemDetailSuccess = function (itemCategory, itemName, itemPrice, itemUnit) {

        var itemDetailSuccess = itemCategory && itemName && itemPrice && itemUnit;
        return itemDetailSuccess;
    };
    this.saveItem = function (goods, itemCategory, itemName, itemPrice, itemUnit) {
//        var currentItems = localStorageService.get('allGoods');
        var newItem = this.item(goods, itemCategory, itemName, itemPrice, itemUnit);
        goods.push(newItem);
//        localStorageService.set('allGoods', goods);
        $http.post('/api/goods', {'goods': goods}).success(function(){});

    };
    this.modifyCategoryNum = function (num, itemCategory) {

//        var currentCategory = localStorageService.get('category');
        $http.get('/api/categories').success(function(categories){
            _.forEach(categories, function (category) {
                if (category.name === itemCategory) {
                    return category.num = +category.num + num;
                }
            });
            $http.post('/api/categories', {'categories': categories}).success(function(){});
        });
//        _.forEach(currentCategory, function (category) {
//            if (category.name === itemCategory) {
//                return category.num = +category.num + num;
//            }
//        });
//        $http.post('/api/categories', {'categories': currentCategory}).success(function(){});
//        localStorageService.set('category', currentCategory);
    };

    this.succeedSave = function(goods, name, itemName, itemPrice, itemUnit){
        this.saveItem(goods, name, itemName, itemPrice, itemUnit);
        this.modifyCategoryNum(1, name);
        $location.path('/goodsManage');
    };
    this.saveButton = function (itemCategory, itemName, itemPrice, itemUnit) {

        var currentThis = this;
        $http.get('/api/goods').success(function(goods){
            var hasExistItem =  currentThis.hasExistItem(goods, itemName);
            var itemDetailSuccess = currentThis.itemDetailSuccess(itemCategory.name, itemName, itemPrice, itemUnit);

            if (!itemDetailSuccess) {
                alert('请填写完整商品信息!');
            }
            if (hasExistItem !== -1) {
                alert('此商品已存在,请重新输入!');
            } else {
                $http.post('/api/goods', {'goods': goods}).success(function(){
                    currentThis.succeedSave(goods, itemCategory.name, itemName, itemPrice, itemUnit);
                });
            }
        });
//
//        var currentThis = this;
//        this.hasExistItem(itemName, function(hasExistItem){
//            var itemDetailSuccess = currentThis.itemDetailSuccess(itemCategory.name, itemName, itemPrice, itemUnit);
//
//            if (!itemDetailSuccess) {
//                alert('请填写完整商品信息!');
//            }
//            if (hasExistItem !== -1) {
//                alert('此商品已存在,请重新输入!');
//            } else {
//                $http.post('/api/goods', {'goods': goods}).success(function(){
//                    currentThis.succeedSave(goods, itemCategory.name, itemName, itemPrice, itemUnit);
//                });
//            }
//        });

    };

    this.getAllCategories = function (callback) {

//        var category = localStorageService.get('category');
        $http.get('/api/categories').success(function(categories){
            var allCategories = [];
            _.forEach(categories, function (num) {
                allCategories.push({name: num.name});
            });
            callback(allCategories);
        });
//        var allCategories = [];
//        _(category).forEach(function (num) {
//            allCategories.push({name: num.name});
//        });
//        return allCategories;
    };

    this.updateItem = function (updateObject, callback) {

        $http.get('/api/goods').success(function(goods){
            var index = _.findIndex(goods, {'name': updateObject.name});
            goods[index] = updateObject;
            $http.post('/api/goods', {'goods': goods}).success(function(){});
            callback();
        });
    };

    this.deleteButton = function (item, callback) {
        var currentThis = this;
        $http.get('/api/goods').success(function(goods){
            $http.delete('/api/goods/' + item.Id, {'goods': goods}).success(function(){});
            currentThis.modifyCategoryNum(-1, item.category);
            callback();
        });
    };

});

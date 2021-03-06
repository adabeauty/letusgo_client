'use strict';
angular.module('letusgoApp').service('GoodService', function (localStorageService, $http) {

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

    this.hasExistItem = function (goods, itemName) {

        var exist = _.findIndex(goods, {name: itemName});
        return exist;

    };

    this.saveItem = function (goods, itemCategory, itemName, itemPrice, itemUnit) {

        var newItem = this.item(goods, itemCategory, itemName, JSON.parse(itemPrice).toFixed(2), itemUnit);
        $http.post('/api/goods/' + newItem.Id, {'newGood': newItem});
    };
    this.modifyCategoryNum = function (num, itemCategory) {

        $http.get('/api/categories').success(function(categories){
            var index = _.findIndex(categories, {name: itemCategory});
            categories[index].num = JSON.parse(categories[index].num) + num;
            $http.put('/api/categories/' + categories[index].ID, {'category': categories[index]}).success(function(){});
        });
    };

    this.succeedSave = function(goods, name, itemName, itemPrice, itemUnit){
        this.saveItem(goods, name, itemName, itemPrice, itemUnit);
        this.modifyCategoryNum(1, name);
    };
    this.saveNewGood = function (itemCategory, itemName, itemPrice, itemUnit, callback) {

        var currentThis = this;
        $http.get('/api/goods').success(function(goods){
            var hasExistItem =  currentThis.hasExistItem(goods, itemName);
            var itemDetailSuccess = itemCategory && itemName && itemPrice && itemUnit;
            if (!itemDetailSuccess) {
                alert('请填写完整商品信息!');
                return false;
            }
            if (hasExistItem !== -1) {
                alert('此商品已存在,请重新输入!');
                return false;
            } else {
                currentThis.succeedSave(goods, itemCategory.name, itemName, itemPrice, itemUnit);
                callback();
            }
        });
    };

    this.getAllCategories = function (callback) {

        $http.get('/api/categories').success(function(categories){
            var allCategories = [];
            _.forEach(categories, function (num) {
                allCategories.push({name: num.name});
            });
            callback(allCategories);
        });
    };

    this.updateItem = function (updateObject) {
        $http.put('/api/goods/' + updateObject.Id, {'good': updateObject});
    };

    this.deleteButton = function (item) {
        $http.delete('/api/goods/' + item.Id);
        this.modifyCategoryNum(-1, item.category);
    };

});

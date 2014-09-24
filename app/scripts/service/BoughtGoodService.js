'use strict';
angular.module('letusgoApp').service('BoughtGoodsService', function (localStorageService, $http) {

    this.BoughtItem = function (item, num) {
        return {
            num: num,
            item: item
        };
    };

    this.hasExistGoods = function (name, boughtGoods) {

        var boughtGood;
        if(boughtGoods != []){
            for (var i = 0; i < boughtGoods.length; i++) {
                if (name === boughtGoods[i].item.name) {
                    return boughtGoods[i];
                }
            }
        }
        return boughtGood;
    };

    this.addCartNum= function (item, callback) {

        var currentThis = this;
        $http.get('api/boughtGoods').success(function(data){
            var boughtGood = currentThis.hasExistGoods (item.name, data);
            boughtGood ? boughtGood.num++ : data.push(currentThis.BoughtItem(item, 1));
            $http.post('/api/boughtGoods', {'boughtGoods': data}).success(function(){});
            callback(data);
        });

    };

    this.cartList = function (className, boughtgoods) {

        return {
            categoryName: className,
            boughtgoods: boughtgoods
        };
    };
    this.getGoodsArray = function(boughtGoods){

        var goodsObject = _.groupBy(boughtGoods, function (num) {
            return num.item.category;
        });
        var goodsArray = _.map(goodsObject);
        return  goodsArray;
    };
    this.generateCartGoods = function(boughtGoods){
        var goodsArray = this.getGoodsArray(boughtGoods);
        var curerntThis = this;
        var cartGoodsArray = [];
        _.forEach(goodsArray, function(every){
            var category = curerntThis.cartList(every[0].item.category, every);
            cartGoodsArray.push(category );
        });
        return cartGoodsArray;
    };

    this.getTotalMoney = function (boughtGoods) {

        var totalMoney = 0;
        _.forEach(boughtGoods, function (num) {
            totalMoney += num.num * num.item.price;
        });

        return totalMoney;
    };

    this.getClickCount = function(data){

        var sum = 0;
        _.forEach(data, function (item) {
            sum += item.num;
        });
        return sum;
    };

    this.refreshData = function(callback){
        var currentThis = this;
        $http.get('/api/boughtGoods').success(function(data){
            console.log('data:',data);
            var result = {
                totalAmount: currentThis.getTotalMoney(data),
                cartGoods: currentThis.generateCartGoods(data),
                totalCount: currentThis.getClickCount(data)
            };
            callback(result);
        });
    };
    this.addClickcount = function (direction, number,callback) {

        var currentThis = this;
        $http.get('/api/boughtGoods').success(function(data){
            var clickCount = currentThis.getClickCount(data);
            callback(clickCount);
        });

    };
    this.decreaseOrDelete = function(boughtGoods, i){

        if (boughtGoods[i].num === 1) {
            boughtGoods[i].num--;
            _.remove(boughtGoods, function (boughtGood) {
                return boughtGood.num === 0;
            });
        } else {
            boughtGoods[i].num--;
        }
        $http.post('/api/boughtGoods', {'boughtGoods': boughtGoods}).success(function(){});

    };
    this.processNum = function (boughtGoods, direction, i) {

        if (direction === 1) {
            boughtGoods[i].num++;
            console.log(boughtGoods[i]);
            $http.put('/api/boughtGoods/' + boughtGoods[i].item.Id, {'boughtGood': boughtGoods[i]});
        } else {
            this.decreaseOrDelete(boughtGoods, i);
        }

    };
    this.modifyCartItemNum = function (cartItem, direction, callback) {

        var currentThis = this;
        $http.get('/api/boughtGoods').success(function(boughtGoods){
            _.forEach(boughtGoods, function(every, index){
                if (every.item.name === cartItem.item.name) {
                    currentThis.processNum(boughtGoods, direction, index);
                }
                callback();
            });
        });
    };
    this.deleteItem = function (cartItem) {
        $http.delete('/api/boughtGoods/' + cartItem.item.Id).success(function(){});
    };

    this.clearDate = function () {

        $http.post('/api/boughtGoods', {'boughtGoods': []}).success(function(data){

            localStorageService.set('drinks', 0);
            localStorageService.set('snacks', 0);
            localStorageService.set('nuts', 0);
        });
    };

});
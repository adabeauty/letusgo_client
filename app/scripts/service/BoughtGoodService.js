'use strict';
angular.module('letusgoApp').service('BoughtGoodsService', function (localStorageService, $http) {

    this.BoughtItem = function (item, num) {
        return {    num: num,
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

    this.addCartNum= function (item) {
        var currentThis = this;
        $http.get('api/boughtGoods').success(function(data){

//            var boughtGoods = data;
// 放在server里           if (boughtGoods === 'nil') {
//                boughtGoods = [];
//            }

            var boughtGood = currentThis.hasExistGoods (item.name, data);
            if(boughtGood){
                boughtGood.num++
            }else{
                data.push(currentThis.BoughtItem(item, 1));
            }

            $http.post('/api/boughtGoods', {'boughtGoods': data}).success(function(){
                localStorageService.set('boughtGoods', data);

            });
        });

    };

    this.cartList = function (className, boughtgoods) {

        return {    categoryName: className,
            boughtgoods: boughtgoods
        };
    };
    this.getGoodsArray = function(callback){

        var boughtGoods = localStorageService.get('boughtGoods');
        var goodsObject = _.groupBy(boughtGoods, function (num) {
            return num.item.category;
        });
        var goodsArray = _.map(goodsObject);
        return  goodsArray;
    };
    this.getGroup = function () {

        var goodsArray = this.getGoodsArray();
        var drink = goodsArray[0];
        var nut = goodsArray[1];
        var snack = goodsArray[2];

        var drinks = this.cartList('饮料类', drink);
        var snacks = this.cartList('零食类', snack);
        var nuts = this.cartList('干果类', nut);

        localStorageService.set('drinks', drinks);
        localStorageService.set('snacks', snacks);
        localStorageService.set('nuts', nuts);

    };

    this.generateCartGoods = function () {

        this.getGroup();

        var drinkClass = localStorageService.get('drinks');
        var snackClass = localStorageService.get('snacks');
        var nutClass = localStorageService.get('nuts');

        return [drinkClass, snackClass, nutClass];
    };

    this.getTotalMoney = function () {

        var boughtGoods = localStorageService.get('boughtGoods');
        var totalMoney = 0;

        _.forEach(boughtGoods, function (num) {
            totalMoney += num.num * num.item.price;
        });

        return totalMoney;
    };

    this.getClickCount = function(data){

        var sum = 0;
        if(data !== []){
            _.forEach(data, function (item) {
                sum += item.num;
            });
        }
        console.log('sum ', sum);
        return sum;
    };

    this.refreshData = function(callback){
        var currentThis = this;
        $http.get('/api/boughtGoods').success(function(data){

            var result = {
                totalAmount: currentThis.getTotalMoney(data),
                cartGoods: currentThis.generateCartGoods(data),
                totalCount: currentThis.getClickCount(data)
            };
            console.log('result:',result);
            callback(result);
        });
    };
    this.addClickcount = function (direction, number,callback) {

        var addClickCount = function(clickcount){
            direction === 1 ? clickcount = clickcount + number : clickcount = clickcount - number;
            return clickcount;
        };

        var currentThis = this;
        $http.get('/api/boughtGoods').success(function(data){

            var clickCount = currentThis.getClickCount(data);
            console.log('clickCount:', clickCount);
            var currentClickCount = addClickCount(clickCount);
            callback(currentClickCount);
        });

    };
    this.getboughtGoodsLength = function () {
        var boughtGoods = localStorageService.get('boughtGoods');
        return  boughtGoods.length;
    };

    this.decreaseOrDelete = function(i){
        var boughtGoods = localStorageService.get('boughtGoods');
        if (boughtGoods[i].num === 1) {
            boughtGoods[i].num--;
            _.remove(boughtGoods, function (boughtGood) {
                return boughtGood.num === 0;
            });

        } else {
            boughtGoods[i].num--;
        }
        localStorageService.set('boughtGoods', boughtGoods);
    };
    this.processNum = function (direction, i) {

        var boughtGoods = localStorageService.get('boughtGoods');

        if (direction === 1) {
            boughtGoods[i].num++;
            localStorageService.set('boughtGoods', boughtGoods);
        } else {
            this.decreaseOrDelete(i);
        }

    };
    this.modifyCartItemNum = function (cartItem, direction) {

        var boughtGoods = localStorageService.get('boughtGoods');
        var currentThis = this;
        _.forEach(boughtGoods, function(every, index){
            if (every.item.name === cartItem.item.name) {
                currentThis.processNum(direction, index);
            }
        });
        boughtGoods = localStorageService.get('boughtGoods');
        $http.post('/api/boughtGoods', {'boughtGoods': boughtGoods}).success(function(){});

    };
    this.deleteItem = function (cartItem) {
        var boughtGoods = localStorageService.get('boughtGoods');

        _.remove(boughtGoods, function (num) {
            return num.item.name === cartItem.item.name;
        });
        $http.post('/api/boughtGoods', {'boughtGoods': boughtGoods}).success(function(){});
        localStorageService.set('boughtGoods', boughtGoods);

    };

    this.clearDate = function () {

        $http.post('/api/boughtGoods', {'boughtGoods': []}).success(function(data){

            localStorageService.set('boughtGoods', []);
            localStorageService.set('drinks', 0);
            localStorageService.set('snacks', 0);
            localStorageService.set('nuts', 0);
        });

    };

});
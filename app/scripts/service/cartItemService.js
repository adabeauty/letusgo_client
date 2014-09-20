'use strict';
angular.module('letusgoApp').service('BoughtGoodsService', function (localStorageService, $http) {

    function getClickCount (callback){

        $http.get('/api/clickCount').success(function(data){
            callback(JSON.parse(data));
        });
    };

    function setClickCount(clickCount, callback){

        $http.post('/api/clickCount', {'clickCount': clickCount}).success(function(data){
            callback(data);
        });

    };
    this.getClickCount = function(callback){
        getClickCount(function(data) {
            callback(data);
        });
    };

    this.BoughtItem = function (item, num) {
        return {    num: num,
            item: item
        };
    };

    this.hasExistGoods = function (name, boughtGoods) {
        var boughtGood;

        if(boughtGoods !== null){
            for (var i = 0; i < boughtGoods.length; i++) {

                if (name === boughtGoods[i].item.name) {
                    return boughtGoods[i];
                }
            }
        }

        return boughtGood;
    };
    this.addClickcount = function (direction, number,callback) {

        var addClickCount = function(clickcount){
            direction === 1 ? clickcount = clickcount + number : clickcount = clickcount - number;
            return clickcount;
        };
//        var currentThis = this;
        this.getClickCount(function(getData){

            var currentClickCount = addClickCount(getData);

            setClickCount(currentClickCount, function(setDate){
                console.log(currentClickCount);
                if(setDate === 'ok'){
                    callback(currentClickCount);
                }
            });
            callback(currentClickCount);
        });

//        var clickcount = +localStorageService.get('clickcount');
//
//        direction === 1 ? clickcount = clickcount + number : clickcount = clickcount - number;
//
//        localStorageService.set('clickcount', clickcount);
//        return clickcount;
    };
    this.addCartNum= function (item) {

        var boughtGoods = localStorageService.get('boughtGoods');

        if (localStorageService.get('boughtGoods') === null) {
            boughtGoods = [];
        }
        var boughtGood = this.hasExistGoods (item.name, boughtGoods);

        boughtGood ? boughtGood.num++ : boughtGoods.push(this.BoughtItem(item, 1));

        localStorageService.set('boughtGoods', boughtGoods);
    };
    this.cartList = function (className, boughtgoods) {

        return {    categoryName: className,
            boughtgoods: boughtgoods
        };
    };
    this.getGoodsArray = function(){
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

        for (var i = 0; i < boughtGoods.length; i++) {
            if (boughtGoods[i].item.name === cartItem.item.name) {

                this.processNum(direction, i);
            }
        }
    };
    this.deleteItem = function (cartItem) {
        var boughtGoods = localStorageService.get('boughtGoods');

        _.remove(boughtGoods, function (num) {
            return num.item.name === cartItem.item.name;
        });

        localStorageService.set('boughtGoods', boughtGoods);

    };

    this.clearDate = function () {

//        localStorageService.set('clickcount', 0);
        setClickCount(0, function(data){
            if(data === 'ok'){
                callback(data);
            }
        });
        localStorageService.set('boughtGoods', '');
        localStorageService.set('drinks', 0);
        localStorageService.set('snacks', 0);
        localStorageService.set('nuts', 0);
    };

});
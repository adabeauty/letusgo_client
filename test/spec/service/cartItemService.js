'use strict';
xdescribe('cartItemService test: ', function () {

    var BoughtGoodsService, localStorageService;
    var store = {};
    beforeEach(module('letusgoApp'));

    beforeEach(inject(function ($injector) {

        BoughtGoodsService = $injector.get('BoughtGoodsService');
        localStorageService = $injector.get('localStorageService');

        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorageService, 'set').and.callFake(function (key, value) {
            return store[key] = value;
        });

    }));

    describe('test boughtItem():', function () {
        it('item class generator:', function () {
            var boughtItem = BoughtGoodsService.BoughtItem({category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}, 3);
            expect(boughtItem.num).toEqual(3);
        });
    });

    describe('test addClickcount:', function () {

        it('up click count work:', function () {
            localStorageService.set('clickcount', 10);
            var clickCountUp = BoughtGoodsService.addClickcount(1, 5);
            expect(clickCountUp).toBe(15);

        });
        it('down click count work:', function () {

            localStorageService.set('clickcount', 10);
            var clickCountDown = BoughtGoodsService.addClickcount(0, 5);
            expect(clickCountDown).toBe(5);

        });
    });

    var noExistItem, boughtItem, newItem;
    beforeEach(function () {

        newItem = {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'};
        boughtItem = {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}};
        noExistItem = {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'};

    });

    describe('test hasExistGoods():', function () {
        var existName, unexistName;
        beforeEach(function () {
            existName = '可口可乐';
            unexistName = '雪碧';
        });
        it('noughtGoods is null:', function () {
            var result = BoughtGoodsService.hasExistGoods(unexistName, null);
            expect(result).toEqual(undefined);
        });
        it('goods exist:', function () {
            var result = BoughtGoodsService.hasExistGoods(existName, [boughtItem]);
            expect(result.item.name).toEqual('可口可乐');
        });
        it('goods unExist:', function () {
            var result = BoughtGoodsService.hasExistGoods(unexistName, [boughtItem]);
            expect(result).toEqual(undefined);
        });

    });

    describe('test add_cart_num():', function () {

//        beforeEach(function () {
//
//            localStorageService.set('boughtGoods', boughtItem);
//
//        });

        it('boughtGoods is null', function () {

            spyOn(BoughtGoodsService, 'hasExistGoods').and.returnValue(undefined);

            spyOn(BoughtGoodsService, 'BoughtItem').and.returnValue(boughtItem);

            localStorageService.set('boughtGoods', null);
            BoughtGoodsService.addCartNum(newItem);

            var boughtGoods = localStorageService.get('boughtGoods');

            expect(BoughtGoodsService.hasExistGoods).toHaveBeenCalled();
            expect(BoughtGoodsService.BoughtItem).toHaveBeenCalled();
            expect(boughtGoods[0].item.name).toEqual('可口可乐');
            expect(boughtGoods[0].num).toEqual(1);
        });

        it('boughtGoods is exist', function () {

            spyOn(BoughtGoodsService, 'hasExistGoods').and.returnValue(boughtItem);
            localStorageService.set('boughtGoods', boughtItem);
            BoughtGoodsService.addCartNum(boughtItem);

            var boughtGoods = localStorageService.get('boughtGoods');
            expect(BoughtGoodsService.hasExistGoods).toHaveBeenCalled();
            expect(boughtGoods.num).toEqual(2);
        });

    });

    var className;
    describe('test cartList()', function () {

        beforeEach(function () {
            className = '饮料类';
        });
        it('cartList work', function () {
            var cartListResult = BoughtGoodsService.cartList(className, boughtItem);
            expect(cartListResult.categoryName).toEqual('饮料类');
        });

    });

    var boughtItems = [
        {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}},
        {num: 3, item: {category: '零食类', name: '可比克', price: '4.50', unit: '袋'}},
        {num: 4, item: {category: '干果类', name: '开心果', price: '15.00', unit: '袋'}}
    ];
    describe('test getgroup():', function () {

        beforeEach(function () {

            localStorageService.set('boughtGoods', boughtItems);

        });
        it('getgroup work', function () {
            BoughtGoodsService.getGroup();

            var drinks = localStorageService.get('drinks');
            var nuts = localStorageService.get('nuts');
            var snacks = localStorageService.get('snacks');

            expect(drinks.categoryName).toEqual('饮料类');
            expect(nuts.categoryName).toEqual('干果类');
            expect(snacks.categoryName).toEqual('零食类');

        });

    });

    var getGroupItem;
    describe('test generateCartGoods():', function () {

        beforeEach(function () {
            getGroupItem = [
                { categoryName: '饮料类',
                    boughtgoods: {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}}
                },
                { categoryName: '零食类',
                    boughtgoods: {num: 3, item: {category: '零食类', name: '可比克', price: '4.50', unit: '袋'}}
                },
                { categoryName: '干果类',
                    boughtgoods: {num: 4, item: {category: '干果类', name: '开心果', price: '15.00', unit: '袋'}}
                }
            ];
            spyOn(BoughtGoodsService, 'getGroup').and.callFake(function () {

                localStorageService.set('drinks', getGroupItem[0]);
                localStorageService.set('snacks', getGroupItem[1]);
                localStorageService.set('nuts', getGroupItem[2]);
            });
        });

        it('invoke getGroup', function () {

            var generateCartGoodsResult = BoughtGoodsService.generateCartGoods();
            expect(BoughtGoodsService.getGroup).toHaveBeenCalled();
            expect(generateCartGoodsResult.length).toBe(3);

        });

        it('the length of generateCartGoods', function () {

            var generateCartGoodsResult = BoughtGoodsService.generateCartGoods();
            expect(generateCartGoodsResult.length).toBe(3);

        });

        it('the content of generateCartGoods', function () {

            var generateCartGoodsResult = BoughtGoodsService.generateCartGoods();

            expect(generateCartGoodsResult[1].categoryName).toEqual('零食类');
            expect(generateCartGoodsResult[0].boughtgoods.num).toBe(1);
            expect(generateCartGoodsResult[2].boughtgoods.item.name).toEqual('开心果');
            expect(generateCartGoodsResult[2].boughtgoods.item.price).toEqual('15.00');

        });
    });

    describe('test getTotalMoney():', function () {
        beforeEach(function () {

            localStorageService.set('boughtGoods', boughtItems);

        });
        it('getTotalMoney is ok', function () {
            var totalMoney = BoughtGoodsService.getTotalMoney();
            expect(totalMoney).toBe(76.5);
        });
    });

    describe('test getboughtGoodsLength():', function () {

        beforeEach(function () {
            localStorageService.set('boughtGoods', boughtItems);
        });
        it('getboughtGoodsLength is ok', function () {
            var length = BoughtGoodsService.getboughtGoodsLength();
            expect(length).toBe(3);
        });

    });

    describe('test deleteOrDecrease:', function(){
       beforeEach(function(){
           var boughtItems = [
               {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}},
               {num: 3, item: {category: '零食类', name: '可比克', price: '4.50', unit: '袋'}},
               {num: 4, item: {category: '干果类', name: '开心果', price: '15.00', unit: '袋'}}
           ];
           localStorageService.set('boughtGoods', boughtItems);
       });
       it('decrease by 1', function(){
           BoughtGoodsService.decreaseOrDelete(1);

           var allGoods = localStorageService.get('boughtGoods');
           expect(allGoods[1].num).toBe(2);
       });
       it('delete', function(){
           BoughtGoodsService.decreaseOrDelete(0);
           var allGoods = localStorageService.get('boughtGoods');
           expect(allGoods.length).toBe(2);
       });
    });
    var deleteGood;
    describe('test deleteItem():', function () {
        beforeEach(function () {
            localStorageService.set('boughtGoods', boughtItems);
            deleteGood = {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}};
        });
        it('deleteItem is ok', function () {
            BoughtGoodsService.deleteItem(deleteGood);
            var allGoods = localStorageService.get('boughtGoods');

            expect(allGoods.length).toEqual(2);
        });
    });


    var processI, directionUp, directionDown;
    describe('test processNum():', function () {

        beforeEach(function () {
            localStorageService.set('boughtGoods', boughtItems);
            processI = 1;
            directionUp = 1;
            directionDown = 0;
        });
        it('up num is ok', function () {

            BoughtGoodsService.processNum(directionUp, processI);

            var goodUp = localStorageService.set('boughtGoods', boughtItems);
            expect(goodUp[processI].num).toBe(5);
        });
        it('down num is ok', function () {
            BoughtGoodsService.processNum(directionDown, processI);

            var goodDown = localStorageService.set('boughtGoods', boughtItems);
            expect(goodDown[processI].num).toBe(4);
        });
    });

    var cartItem, direction;
    describe('test modifyCartItemNum()', function () {
        beforeEach(function () {

            cartItem = {num: 3, item: {category: '零食类', name: '可比克', price: '4.50', unit: '袋'}};
            direction = 1;

            localStorageService.set('boughtGoods', boughtItems);

            spyOn(BoughtGoodsService, 'processNum');

        });
        it('modifyCartItemNum', function () {

            BoughtGoodsService.modifyCartItemNum(cartItem, direction);
            expect(BoughtGoodsService.processNum).toHaveBeenCalled();
        });

    });

    var getBoughtGoods, getClickcount, getDrinks, getSnacks, getNuts;
    describe('test clearDate()', function () {

        beforeEach(function () {

            BoughtGoodsService.clearDate();

            getBoughtGoods = localStorageService.get('boughtGoods');
            getClickcount = localStorageService.get('clickcount');
            getDrinks = localStorageService.get('drinks');
            getSnacks = localStorageService.get('snacks');
            getNuts = localStorageService.get('nuts');
        });
        it('clearDate is ok', function () {

            expect(getBoughtGoods).toBe('');
            expect(getClickcount).toBe(0);
            expect(getDrinks).toBe(0);
            expect(getSnacks).toBe(0);
            expect(getNuts).toBe(0);
        });

    });
});

describe('cartItemService test: ', function () {

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
            expect(boughtItem).toEqual({num: 3,
                item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}
            });
        });
    });
    describe('test addClickcount:', function () {
        beforeEach(function () {
            localStorageService.set('clickcount', 10);
        });
        it('up click count work:', function () {

            // localStorageService.set('clickcount', 10);
            var clickCount_up = BoughtGoodsService.addClickcount(1, 5);
            expect(clickCount_up).toBe(15);

        });
        it('down click count work:', function () {

            localStorageService.set('clickcount', 10);
            var clickCount_down = BoughtGoodsService.addClickcount(0, 5);
            expect(clickCount_down).toBe(5);

        });
    });

    var item, existItem, noExistItem, boughtItem;
    beforeEach(function () {

        newItem = {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'};
        boughtItem = {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}};
        noExistItem = {category: '饮料类', name: '雪碧', price: '3.00', unit: '瓶'};

    });
    var exist_name, unexist_name;
    describe('test hasExistGoods():', function () {
        beforeEach(function () {
            exist_name = '可口可乐';
            unexist_name = '雪碧';
        });
        it('goods exist:', function () {
            var result = BoughtGoodsService.hasExistGoods(exist_name, [boughtItem]);
            expect(result.item.name).toEqual('可口可乐');
        });
        it('goods unExist:', function () {
            var result = BoughtGoodsService.hasExistGoods(unexist_name, [boughtItem]);
            expect(result).toEqual(false);
        });
    });

    describe('test add_cart_num():', function () {

        beforeEach(function () {

            localStorageService.set('boughtGoods', boughtItem);

        });

        it('boughtGoods is 0', function () {

            spyOn(BoughtGoodsService, 'hasExistGoods').and.returnValue(false);

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

            // localStorageService.set('boughtGoods', boughtItem);
            spyOn(BoughtGoodsService, 'hasExistGoods').and.returnValue(boughtItem);
            BoughtGoodsService.addCartNum(boughtItem);

            var boughtGoods = localStorageService.get('boughtGoods');
            console.log(boughtGoods);
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
            var cartList_result = BoughtGoodsService.cartList(className, boughtItem);
            expect(cartList_result.categoryName).toEqual('饮料类');
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

            var drinks = localStorageService.get("drinks");
            var nuts = localStorageService.get("nuts");
            var snacks = localStorageService.get("snacks");

            expect(drinks.categoryName).toEqual('饮料类');

        });

    });

    var getGroup_item;
    describe('test generateCartGoods():', function () {

        beforeEach(function () {
            getGroup_item = [
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
            spyOn(BoughtGoodsService, 'getGroup').andCallFake(function () {

                localStorageService.set("drinks", getGroup_item[0]);
                localStorageService.set("snacks", getGroup_item[1]);
                localStorageService.set("nuts", getGroup_item[2]);
            });
        });

        it('invoke getGroup', function () {

            var generateCartGoods_result = BoughtGoodsService.generateCartGoods();
            expect(BoughtGoodsService.getGroup).toHaveBeenCalled();

        });

        it('the length of generateCartGoods', function () {

            var generateCartGoods_result = BoughtGoodsService.generateCartGoods();
            expect(generateCartGoods_result.length).toBe(3);

        });

        it('the content of generateCartGoods', function () {

            var generateCartGoods_result = BoughtGoodsService.generateCartGoods();

            expect(generateCartGoods_result[1].categoryName).toEqual('零食类');
            expect(generateCartGoods_result[0].boughtgoods.num).toBe(1);
            expect(generateCartGoods_result[2].boughtgoods.item.name).toEqual('开心果');
            expect(generateCartGoods_result[2].boughtgoods.item.price).toEqual('15.00');

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


    var deleteGood;
    describe('test deleteItem():', function () {
        beforeEach(function () {
            localStorageService.set('boughtGoods', boughtItems);
            deleteGood = {num: 1, item: {category: '饮料类', name: '可口可乐', price: '3.00', unit: '瓶'}};
        });
        it('deleteItem is ok', function () {
            BoughtGoodsService.deleteItem(deleteGood);
            var allGoods = localStorageService.get('boughtGoods');
            // console.log(allGoods);
            expect(allGoods.length).toEqual(2);
        });
    });

    var getBoughtGoods, getClickcount, getDrinks, getSnacks, getNuts;
    describe('test clearDate()', function () {

        beforeEach(function () {

            BoughtGoodsService.clearDate();

            getBoughtGoods = localStorageService.get("boughtGoods");
            getClickcount = localStorageService.get("clickcount");
            getDrinks = localStorageService.get("drinks");
            getSnacks = localStorageService.get("snacks");
            getNuts = localStorageService.get("nuts");
        });
        it('clearDate is ok', function () {

            expect(getBoughtGoods).toBe('');
            expect(getClickcount).toBe(0);
            expect(getDrinks).toBe(0);
            expect(getSnacks).toBe(0);
            expect(getNuts).toBe(0);
        });

    });
    var processI, direction_up, direction_down;
    describe('test processNum():', function () {

        beforeEach(function () {
            localStorageService.set('boughtGoods', boughtItems);
            processI = 1;
            direction_up = 1;
            direction_down = 0;
        });
        it('up num is ok', function () {

            BoughtGoodsService.processNum(direction_up, processI);

            var good_up = localStorageService.set('boughtGoods', boughtItems);
            expect(good_up[processI].num).toBe(5);
        });
        it('down num is ok', function () {
            BoughtGoodsService.processNum(direction_down, processI);

            var good_down = localStorageService.set('boughtGoods', boughtItems);
            expect(good_down[processI].num).toBe(4);
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

});
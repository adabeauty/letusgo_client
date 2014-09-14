angular.module('letusgoApp').service('ItemService', function (localStorageService) {

    this.item = function (category, name, price, unit) {
        return {    name: name,
                    price: price,
                    unit: unit,
                    category: category
                 };
    };
    this.loadItems = function () {
        var allItems = [
            this.item('饮料类', '可口可乐', '3.00', '瓶'),
            this.item('饮料类', '雪碧', '3.00', '瓶'),
            this.item('饮料类', '橙汁', '3.50', '瓶'),
            this.item('干果类', '腰果', '15.00', '斤'),
            this.item('干果类', '开心果', '20.50', '斤'),
            this.item('零食类', '上好佳', '4.50', '袋'),
            this.item('零食类', '可比克', '3.50', '袋')
        ];
        localStorageService.set('allItems', allItems);
        return allItems;
    };

});
'use strict';
angular.module('letusgoApp').service('goodsManageService', function (localStorageService) {

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

        this.decreaseCategoryNum(item);

    };

});

angular.module('letusgoApp').service('goodsUpdateService', function (localStorageService) {

    this.updateItem = function () {

        var updateObject = localStorageService.get('updateItem');
        var allGoods = localStorageService.get('allGoods');
        var index = _.findIndex(allGoods, {'name': updateObject.name});
        allGoods[index] = updateObject;

        localStorageService.set('allGoods', allGoods);
        return index;
    };

});

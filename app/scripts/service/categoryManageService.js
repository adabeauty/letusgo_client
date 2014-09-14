angular.module('letusgoApp').service('categoryManageService', function (localStorageService) {

    this.deleteButton = function (every) {

        var currentCategory = localStorageService.get('category');

        if (every.num !== '0') {
            alert('此分类下有商品存在,不能删除');
        } else {
            var events = _.remove(currentCategory, function (num) {
                return every.ID === num.ID;
            });
        }
        localStorageService.set('category', currentCategory);

    };

});

angular.module('letusgoApp').service('cagtegoryUpdateService', function (localStorageService) {

    this.updateCategory = function () {

        var updateObeject = localStorageService.get('updateCategory');
        var allCategories = localStorageService.get('category');
        var index = _.findIndex(allCategories, {'ID': updateObeject.ID});
        allCategories[index] = updateObeject;

        localStorageService.set('category', allCategories);
        return index;
    };
});

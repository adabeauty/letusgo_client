'use strict';

/**
 * @ngdoc overview
 * @name letGoApp
 * @description
 * # letGoApp
 *
 * Main module of the application.
 */
angular
    .module('letusgoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'LocalStorageModule'
    ])
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
    }])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/cartList', {
                templateUrl: 'views/cartList.html',
                controller: 'CartListCtrl'
            })
            .when('/shop', {
                templateUrl: 'views/shop.html',
                controller: 'ShopCtrl'
            })
            .when('/payList', {
                templateUrl: 'views/payList.html',
                controller: 'PayListCtrl'
            })
            .when('/categoryManage', {
                templateUrl: 'views/categoryManage.html',
                controller: 'CategoryCtrl'
            })
            .when('/categoryAdd', {
                templateUrl: 'views/categoryAdd.html',
                controller: 'CategoryAddCtrl'
            })
            .when('/categoryUpdate', {
                templateUrl: 'views/categoryUpdate.html',
                controller: 'CategoryUpdateCtrl'
            })
            .when('/goodsManage', {
                templateUrl: 'views/goodsManage.html',
                controller: 'GoodsCtrl'
            })
            .when('/goodsAdd', {
                templateUrl: 'views/goodsAdd.html',
                controller: 'GoodsAddCtrl'
            })
            .when('/goodsUpdate', {
                templateUrl: 'views/goodsUpdate.html',
                controller: 'GoodsUpdateCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

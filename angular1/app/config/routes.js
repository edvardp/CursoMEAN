(function () {
    'use strict';

    angular.module('primeiroApp')
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('dashboard', {
                        url: '/dashboard',
                        controller: 'DashboardController',
                        templateUrl: 'dashboard/dashboard.html',
                    })
                    .state('billingCycle', {
                        url: '/billingCycles',
                        templateUrl: 'billingCycle/tabs.html'
                    });

                $urlRouterProvider.otherwise('/dashboard');
            }
        ]);
})();


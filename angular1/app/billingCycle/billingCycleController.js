(function () {
    'use strict';

    angular.module('primeiroApp')
        .controller('BillingCycleController', [
            '$http',
            'messages',
            'tabs',
            BillingCycleController
        ]);

    function BillingCycleController($http, messages, tabs) {
        const vm = this;
        const url = 'http://localhost:3003/api/BillingCycles';

        vm.refresh = function () {
            $http.get(url)
                .then(function (response) {
                    vm.billingCycle = {};
                    vm.billingCycles = response.data;
                    tabs.show(vm, { tabList: true, tabCreate: true });
                })
        }

        vm.create = function () {
            $http.post(url, vm.billingCycle)
                .then(function (response) {
                    vm.refresh();
                    messages.addSuccess('Operação realizada com sucesso!');
                }, function (response) {
                    messages.addError(response.data.errors);
                });
        }

        vm.showTabUpdate = function (billingCycle) {
            vm.billingCycle = billingCycle;
            tabs.show(vm, { tabUpdate: true });
        }

        vm.showTabDelete = function (billingCycle) {
            vm.billingCycle = billingCycle;
            tabs.show(vm, { tabDelete: true });
        }

        vm.update = function () {
            const updateUrl = `${url}/${vm.billingCycle._id}`;
            $http.put(updateUrl, vm.billingCycle)
                .then(function (response) {
                    vm.refresh();
                    messages.addSuccess('Alteração realizada com sucesso!');
                }, function (responseError) {
                    messages.addError(responseError.data.errors);
                });
        }

        vm.delete = function () {
            const deleteUrl = `${url}/${vm.billingCycle._id}`;
            $http.delete(deleteUrl, vm.billingCycle)
                .then(function (response) {
                    vm.refresh();
                    messages.addSuccess('Exclusão realizada com sucesso!');
                }, function (responseError) {
                    messages.addError(responseError.data.errors);
                });
        }

        vm.refresh();
    }

})();
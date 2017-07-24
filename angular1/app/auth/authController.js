(function () {
    'use strict';

    angular.module('primeiroApp')
        .controller('AuthController',
        [
            '$location',
            'messages',
            'auth',
            AuthController
        ]);
    function AuthController($location, messages, auth) {
        const vm = this;

        vm.loginMode = true;

        vm.changeMode = () => { vm.loginMode = !vm.loginMode; console.log(vm.loginMode) }

        vm.login = () => {
            auth.login(vm.user, error => error ? messages.addError(error) : $location.path('/'))
        }
        vm.signup = () => {
            auth.signup(vm.user, error => error ? messages.addError(error) : $location.path('/'));
        }

        vm.getUser = () => auth.getUser();

        vm.logout = () => {
            auth.logout(() => $location.path('/'));
        }


    }
})();
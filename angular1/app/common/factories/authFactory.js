(function () {
    'use strict';

    angular.module('primeiroApp')
        .factory('auth', [
            '$http',
            'consts',
            AuthFactory
        ]);

    function AuthFactory($http, consts) {

        let user = null;

        function getUser() {
            if (!user) {
                user = JSON.parse(localStorage.getItem(consts.userKey));
            }
            return user;
        }

        function signup(user, callback) {
            submit('signup', user, callback);
        }

        function login(user, callback) {
            submit('login', user, callback);
        }

        function submit(url, user, callback) {
            $http.post(`${consts.oapiUrl}/${url}`, user)
                .then(res => {
                    localStorage.setItem(consts.userKey, JSON.stringify(res.data));
                    $http.defaults.headers.common.Authorization = res.data.token;
                    if (callback) callback(null, res.data);
                }).catch(function (res) {
                    if (callback) callback(res.data.errors, null);
                });
        }

        function logout(callback) {
            user = null;
            localStorage.removeItem(consts.userKey);
            $http.defaults.headers.common.Authorization = '';
            if (callback) callback(null);
        }

        return { signup, login, logout, getUser };
    }
})();
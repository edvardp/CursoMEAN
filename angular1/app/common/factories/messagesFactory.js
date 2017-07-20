(function () {
    'use strict';

    angular.module('primeiroApp')
        .factory('messages', [
            'toastr',
            MessagesFactory
        ]);

    function MessagesFactory(toastr) {
        function addMessage(message, title, method) {
            if (message instanceof Array) {
                message.forEach(msg => toastr[method](msg, title));
            } else {
                toastr[method](message, title);
            }
        }
        function addSuccess(message) {
            addMessage(message, 'Sucesso', 'success');
        }
        function addError(message) {
            addMessage(message, 'Erro', 'error');
        }
        return { addSuccess, addError }
    }
})();
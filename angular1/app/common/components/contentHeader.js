(function () {
    'use strict';   

    angular.module('primeiroApp')
        .component('contentHeader', {
            bindings: {
                name: '@',
                small: '@',
            },
            template: `
        <section>
            <h1>{{$ctrl.name}} <small>{{$ctrl.small}}</small></h1>
        </section>
        `
        });
})();


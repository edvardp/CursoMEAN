(function () {
    'use strict';

    angular.module('primeiroApp')
        .component('paginator', {
            bindings: {
                url: '@',
                pages: '@',
            },
            controller: [
                '$location',
                function ($location) {
                    this.$onInit = function () {
                        var pages = parseInt(this.pages) || 1;
                        this.pagesArray = Array(pages).fill(0).map((value, index) => index + 1);

                        this.current = parseInt($location.search().page) || 1;
                        this.needPagination = this.pages > 1;
                        this.hasPrev = this.current > 1;
                        this.hasNext = this.current < this.pages;
                    }

                    this.isCurrent = function (index) {
                        return this.current == index;
                    }
                }
            ],
            template: `
            <ul ng-show="$ctrl.needPagination" class="pagination">
                <li ng-if="$ctrl.hasPrev">
                    <a href="{{$ctrl.url}}?page={{$ctrl.current - 1}}">Anterior</a>
                </li>

                <li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
                    <a href="{{$ctrl.url}}?page={{index}}">{{index}}</a>
                </li>

                <li ng-if="$ctrl.hasNext">
                    <a href="{{$ctrl.url}}?page={{$ctrl.current + 1}}">Próximo</a>
                </li>
            </ul>
            `
        });


})();
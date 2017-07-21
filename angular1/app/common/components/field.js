(function () {
    angular.module('primeiroApp')
        .component('field', {
            bindings: {
                id: '@',
                label: '@',
                grid: '@',
                placehoulder: '@',
                type:'@',
                model: '=',
                readonly: '<',
                min: '@',
                max: '@',
                minlength: '@',
                maxlength: '@'
            },
            controller: [
                'gridSystem',
                function (gridSystem) {
                    this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid);
                }
            ],
            template: `        
            <div class="{{$ctrl.gridClasses}}">
                <div class="form-group">
                    <label for="{{$ctrl.id}}">{{$ctrl.label}}</label>
                    <input type="{{$ctrl.type}}" id="{{$ctrl.id}}" class="form-control" 
                            placeholder="{{$ctrl.placeholder}}" 
                            ng-model="$ctrl.model" 
                            ng-readonly="$ctrl.readonly" 
                            {{$ctrl.min ? 'min="$ctrl.min"'}}
                            {{$ctrl.max ? 'max="$ctrl.max"'}}
                            {{$ctrl.minlength ? 'minlength="$ctrl.minlength"'}}
                            {{$ctrl.max ? 'maxlength="$ctrl.maxlength"'}} />
                </div>
            </div>`
        })
})();
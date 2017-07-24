angular.module('primeiroApp').constant('consts', {
  appName: 'MEAN - Primeira Aplicação',
  version: '1.0',
  owner: 'Edvard Pereira',
  year: '2017',
  site: 'http://www.eapp.com.br',
  siteName: 'Eapp',
  apiUrl: 'http://localhost:3003/api',
  oapiUrl: 'http://localhost:3003/oapi',
  userKey: '_primeiro_app_user'
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts;
}])
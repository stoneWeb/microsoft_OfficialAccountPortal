'use strict';

export default class Congfig {
  constructor($rootScope){
    //window.user = '{"name":"lei ding","email":"dl197@126.com","uid":"a8a24311-602b-4408-b774-39742d705f04","AccountId":"4e57548a-705b-487c-8e04-32a04664be8a"}';
    try{
      $rootScope.user = JSON.parse(window.user);
    }catch(ex){
      $rootScope.user = {};
    }
    this.host = 'https://localhost:8080';
    this.appName = "OA";
    this.API = {
      //'host'   : 'https://oaportal.azurewebsites.net',
      'host'   : '',
      'faqs'   : '/account/'+ $rootScope.user.AccountId +'/FAQs',
      'upload' : '/account/'+ $rootScope.user.AccountId +'/FAQFile',
      'bot'    : '/account/'+ $rootScope.user.AccountId +'/BotTest'
    };
    this.fileExt = /(xlsx|xls)/ig;
  }
}
Congfig.$inject = ['$rootScope'];

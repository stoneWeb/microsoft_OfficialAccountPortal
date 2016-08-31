let routerCfg = {
  '/bot_knowledge': {
    state: 'oa.bot_knowledge',
    crumbs: ['Bot management', 'Bot knowledge'],
    url: 'bot_knowledge',
    template: require('../templates/bot_knowledge.html'),
    controller: 'BotKnowledgeCtrl'
  }
}

let router = ($urlRouterProvider, $stateProvider, $locationProvider) => {
  //$locationProvider.html5Mode(true);
  let provider = $stateProvider
      .state('oa', {
        url: '/',
        template: require('../templates/menu.html'),
        controller: 'MenuCtrl'
      });
  Object.keys(routerCfg).forEach((key) => {
    let o = routerCfg[key];
    provider.state(o.state, {
      url: o.url,
      views: {
        'menuContent': {
          template: o.template,
          controller: o.controller
        }
      }
    });
  })
  $urlRouterProvider.otherwise('/bot_knowledge');
}
router.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider']

export default {router, routerCfg}

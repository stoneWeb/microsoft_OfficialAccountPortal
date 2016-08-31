// import css
import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';
//import './styles/ionicons.min.css';

// import lib
import angular from 'angular';
import ui_router from 'angular-ui-router';
import ng_resource from 'angular-resource';
import ui_bootstrap from 'angular-ui-bootstrap';
import r from './modules/router';

// import controllers
import './modules/controllers';

// import directives
import './modules/directives';

// import service
import './modules/services';

let {
  router,
  routerCfg
} = r;

const app = angular.module('app', [
  ui_router,
  ui_bootstrap,
  ng_resource,
  'App.services',
  'App.directives',
  'App.controllers'
])
.run(['$rootScope', '$location', '$sce', 'Cfg', ($rootScope, $location, $sce, Cfg) => {
  document.body.style.display = "block";
  $rootScope.appName = Cfg.appName;
  $rootScope.crumbs = () => {
    let path = $location.path().replace(/\/\d+$/, '');
    if(routerCfg[path]){
        let crmbs = routerCfg[path].crumbs;
        let html = [];
        for(let item of crmbs){
          html.push(`<li>${item}</li>`);
        }
        return $sce.trustAsHtml(html.join(''));
    }
    return ''
  };
  $rootScope.isActive = (path) => {
    return path === $location.path().split('/').slice(0, 2).join('/');
  }
}])
.config(router)

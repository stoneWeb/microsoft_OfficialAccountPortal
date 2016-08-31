'use strict';

import bot from './directives/bot';

angular.module('App.directives', [])
  .directive('bot', ["$sce", "Rest", bot]);

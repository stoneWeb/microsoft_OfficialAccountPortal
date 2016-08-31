'use strict';

import BotKnowledgeCtrl from './controllers/BotKnowledgeCtrl';
import MenuCtrl from './controllers/MenuCtrl';
import ModFaqCtrl from './controllers/modals/ModFaqCtrl';
import ModUrlCtrl from './controllers/modals/ModUrlCtrl';
import ModFileCtrl from './controllers/modals/ModFileCtrl';
import ModTaskCtrl from './controllers/modals/ModTaskCtrl';

angular.module('App.controllers', [])
.controller('MenuCtrl', MenuCtrl)
.controller('BotKnowledgeCtrl', BotKnowledgeCtrl)
.controller('ModFaqCtrl', ModFaqCtrl)
.controller('ModUrlCtrl', ModUrlCtrl)
.controller('ModFileCtrl', ModFileCtrl)
.controller('ModTaskCtrl', ModTaskCtrl);

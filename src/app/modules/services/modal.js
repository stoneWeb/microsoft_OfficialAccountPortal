'use strict';
const modals = {
  'openFaq': {
    template: require('../../templates/modals/faq.html'),
    controller: 'ModFaqCtrl'
  },
  'openImportUrl': {
    template: require('../../templates/modals/import_url.html'),
    controller: 'ModUrlCtrl'
  },
  'openImportFile': {
    template: require('../../templates/modals/import_file.html'),
    controller: 'ModFileCtrl'
  },
  'openTasks': {
    template: require('../../templates/modals/tasks.html'),
    controller: 'ModTaskCtrl'
  }
}
let mixinModal = (target) => {
    for(let k in modals){
        target.prototype[k] = function(data){
            return this.$uibModal.open({
                    animation: true,
                    template: modals[k].template,
                    controller: modals[k].controller,
                    size: modals[k].size || 'lg',
                    resolve: {
                      data(){
                        return data || {};
                      }
                    }
                  })
        }
    }
}

@mixinModal
class Modal {
    constructor($uibModal){
      this.$uibModal = $uibModal;
    }
}

Modal.$inject = ['$uibModal'];
export default Modal

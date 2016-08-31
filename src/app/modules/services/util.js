'use strict';

export default class Util {
    constructor($uibModal){
      //this.$uibModal = $uibModal;
    }
    formatDate(date){
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    }
    checkEmptyObject(obj){
        if(typeof obj != 'object')
            return false
        for(var key in obj)
            return true
        return false
    }
    loadIng(deep){
      let loadDom = document.createElement("div");
      loadDom.innerHTML = "loading...";
      loadDom.className = "top_load";
      document.body.appendChild(loadDom);
      this.loadIng = (d) => {
          loadDom.className = d?"top_load show":"top_load";
      }
      this.loadIng(deep);
    }
}
Util.$inject = ['$uibModal'];

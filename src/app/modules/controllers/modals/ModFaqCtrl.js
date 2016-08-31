'use strict';

export default class ModFaqCtrl {
  constructor($scope, $uibModalInstance, Rest, Util, data) {
      $scope.standard = data.Question || "";
      $scope.similar = data.Questions || [];
      $scope.answer = data.Answer || "";
      $scope.addFaq = () => {
          $scope.similar.push("");
      }
      $scope.removeFaq = (index) => {
          $scope.similar.splice(index, 1)
      }
      $scope.save = () => {
          let d = {
            faqId: data.ID,
            Question: $scope.standard.trim(),
            Questions: $scope.similar,
            Answer: $scope.answer.trim()
          }
          if(!d.Question || d.Questions == 0 || !d.Answer){
            return;
          }
          Util.loadIng(true);
          Rest[data.type+"Faq"](d).then((json) => {
              let d = json.data;
              if(json.Success){
                console.log(d);
                data.callback && data.callback({
                  ID: data.type=="put"?data.ID:d.ID,
                  Question: $scope.standard,
                  Questions: $scope.similar,
                  Answer: $scope.answer,
                  index: data.index,
                  Timestamp: d.Timestamp
                })
              }
              Util.loadIng(false);
              $uibModalInstance.close();
          }).catch((e) => {
              console.log(e);
          });
      }
      $scope.cancel = () => {
          $uibModalInstance.close();
      }
  }
}
ModFaqCtrl.$inject = ['$scope', '$uibModalInstance', 'Rest', 'Util', 'data'];

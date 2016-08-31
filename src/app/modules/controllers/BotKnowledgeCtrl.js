'use strict';

export default class BotKnowledgeCtrl {
  constructor($rootScope, $scope, $timeout, $sce, Util, Modal, Rest) {
    $scope.faqcall = false;
    $scope.faqCkNum = 0;
    $scope.faq = null;
    Rest.getFaqs()
      .then((json) => {
          let d = json.data;
          if(json.Success && Array.isArray(d.entries)){
              var arr = d.entries.map((item, i) => {
                  item.time = Util.formatDate(new Date(item.Timestamp));
                  item.checked = false;
                  let html = item.Questions.map((e) => {
                      return '<p>'+ e +'</p>';
                  });
                  item.html = html.length?$sce.trustAsHtml('<div class="popwrap">'+html.join("")+'</div>'):false;
                  return item
              });
              $scope.faq = arr;
          }
      })
      .catch((err) => {
          $scope.faq = []
      });

    $scope.deleteItem = () => {
        let ids = [], news = [];
        $scope.faq.forEach((item, i) => {
            if(item.checked){
                ids.push(item.ID);
            }else{
                news.push(item)
            }
        });
        if(ids.length > 0){
            Util.loadIng(true);
            Rest.deleteFaq({FAQs: ids}).
              then((json) => {
                  if(json.Success){
                      $scope.faq = news;
                  }
                  Util.loadIng(false);
                  $scope.faqCkNum -= ids.length;
              }).catch((err) => {
                  console.log(err);
              });
        }
    }
    $scope.editItem = (event, index) => {
      event.stopPropagation();
      let d = $scope.faq[index];
      Modal.openFaq({
        type: "update",
        index: index,
        ID: d.ID,
        Question: d.Question,
        Questions: d.Questions,
        Answer: d.Answer,
        callback(d){
            let f = $scope.faq[d.index];
            f.Question = d.Question;
            f.Questions = d.Questions;
            f.Answer = d.Answer;
            let html = d.Questions.map((e) => {
                return '<p>'+ e +' <a href="javascript:;">view</a></p>';
            });
            d.html = $sce.trustAsHtml('<div class="popwrap">'+html.join("")+'</div>');
            $scope.faq[d.index] = f;
        }
      })
    }
    $scope.faqCheck = (ev, index) => {
        ev.stopPropagation();
        if($scope.faq[index]){
          if($scope.faq[index].checked){
            $scope.faqCkNum += 1;
          }else{
            $scope.faqCkNum -= 1;
          }
          $scope.faqcall = $scope.faqCkNum == $scope.faq.length;
          console.log($scope.faqcall);
        }
    }
    $scope.faqCheckAll = (e) => {
        $scope.faq = $scope.faq.map((item) => {
          item.checked = e.target.checked;
          return item;
        });
        $scope.faqCkNum = e.target.checked?$scope.faq.length:0;
    }
    $scope.addNewFaq = () => {
      Modal.openFaq({
        type: "save",
        callback(d){
            let f = $scope.faq;
            let html = d.Questions.map((e) => {
                return '<p>'+ e +' <a href="javascript:;">view</a></p>';
            });
            d.time = Util.formatDate(new Date(d.Timestamp));
            d.html = $sce.trustAsHtml('<div class="popwrap">'+html.join("")+'</div>');
            f.unshift(d);
            $scope.faq = f;
        }
      })
    }
    $scope.importUrl = () => {
      Modal.openImportUrl()
    }
    $scope.importFile = () => {
      Modal.openImportFile()
    }
    $scope.checkTasks = () => {
      Modal.openTasks()
    }
    $scope.toggleBot = () => {
      let dom = document.querySelector("#bot_wrapper");
      dom.style.display = "block";
      $timeout(() => {
        dom.classList.toggle("show")
      }, 20)
    }
  }
}
BotKnowledgeCtrl.$inject = ['$rootScope', '$scope', '$timeout', '$sce', 'Util', 'Modal', 'Rest'];

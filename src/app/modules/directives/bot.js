'use strict';
let template = [
    '<div class="chat-view $direct$">',
      '<div class="chat-wrap">',
          '<strong class="chat-face" style="background-image:url($face$)"></strong>',
          '<div class="chat-text">',
            '$text$',
          '</div>',
      '</div>',
    '</div>'
].join("");
export default ($sce, Rest) => {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
          item: '='
        },
        template: require('../../templates/bot.html'),
        link($scope, $elem, $attr){
          let scroll = $elem[0].querySelector(".bot-scroll");
          let input = $elem[0].querySelector("textarea");
          let suggest = $elem[0].querySelector(".bot_info");

          suggest.addEventListener("click", (e) => {
              if(e.target.nodeName.toLowerCase() == "span" && e.target.parentNode.className=="bot_info_tip"){
                  input.value = e.target.innerHTML;
                  input.focus()
              }
          })

          //Rest.sendToBot("hello");
          input.addEventListener("keydown", (event) => {
              if(event.which == 13){
                  event.preventDefault();
                  if(input.value.trim() == ""){
                    return;
                  }
                  Rest.requestToBot({Question: input.value.trim()})
                    .then((data) => {
                        if(data.Success){
                          var html = $sce.trustAsHtml(template.replace("$text$", data.data).replace("$direct$", "left"));
                          var div = document.createElement("div");
                          div.innerHTML = html;
                          scroll.appendChild(div);
                          scroll.scrollTop = 9999;
                        }
                    })
                  var html = $sce.trustAsHtml(template.replace("$text$", input.value.trim()).replace("$direct$", "right").replace("$face$", "https://oaportal.azurewebsites.net/images/face.png"));
                  var div = document.createElement("div");
                  div.innerHTML = html;
                  scroll.appendChild(div);
                  scroll.scrollTop = 9999;
                  input.value = ""
              }
          }, !1);
          $scope.closeBotTest = () => {
              $elem[0].classList.toggle("show");
              setTimeout(() => {
                $elem[0].style.display = "none";
              }, 300)
          }
        }
    }
}

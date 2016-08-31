'use strict';
export default class Rest {
    constructor($resource, $http, $rootScope, $location, Cfg, Storage){
      this.requestToBot = (data) => {
        return $http.post(Cfg.API["host"] + Cfg.API["bot"], data)
                .then((d) => {
                    if(d.status == 200 || d.status == 304){
                      return d.data
                    }
                    throw "error";
                })
      }

      this.getFaqs = () => {
          return $http.get(Cfg.API["host"] + Cfg.API["faqs"])
                  .then((d) => {
                      if(d.status == 200 || d.status == 304){
                        return d.data
                      }
                      throw "error";
                  })
      }
      let methods = {
              'update': 'PUT',
              'query' : 'GET',
              'get'   : 'GET',
              'save'  : 'POST',
              'delete': 'DELETE'
          }
      let header = {}
      Object.keys(methods).forEach((action) => {
        header[action] = {method:methods[action]}
      })
      let faq = $resource(Cfg.API["host"] + Cfg.API["faqs"] + "/:faqId", {faqId:"@faqId"}, header);

      Object.keys(methods).forEach((item) => {
          this[item+"Faq"] = (data) => {
            var param = {};
            if(item != "save" && item != "delete"){
                param.faqId = data.faqId;
            }
            delete data.faqId;

            return new Promise(function(resolve, reject){
                faq[item](param, data, function(d){
                  if(d.Success){
                    return resolve(d)
                  }else{
                    return reject(d)
                  }
                }, reject);
            })
          }
      });
      this.deleteFaq = (data) => {
          return $http.delete(Cfg.API["host"] + Cfg.API["faqs"], {data: data, headers: {'Content-Type': 'application/json'}})
                .then((d) => {
                  if(d.status == 200 || d.status == 304){
                    return d.data
                  }
                  throw "error";
                });
      }
      this.uploadFile = (file) => {
          if(file instanceof Blob){
              var f = new FormData();
              f.append("FAQ", file);
              return $http.post(Cfg.API["host"] + Cfg.API["upload"], f, {
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined}
                        })
                        .then((d) => {
                          if(d.status == 200 || d.status == 304){
                            return d.data
                          }
                          throw "error";
                        });
          }
      }
    }
}
Rest.$inject = ['$resource', '$http', '$rootScope', '$location', 'Cfg', 'Storage'];

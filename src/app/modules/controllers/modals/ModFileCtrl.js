'use strict';

export default class ModFileCtrl {
  constructor($scope, $uibModalInstance, data, Util, Cfg, Rest) {
      var scope = $scope, f;
      $scope.fileChange = (elem) => {
          let file = elem.files[0], ext = file.name.lastIndexOf(".");
          ext = file.name.slice(ext+1);
          if(Cfg.fileExt.test(ext)){
            scope.$apply(() => {
                f = elem.files[0];
                scope.filename = f.name
            });
          }else{
            f = null;
            alert("Do not allow the file format!")
          }
      }
      $scope.save = () => {
          if(f){
              Util.loadIng(true);
              Rest.uploadFile(f)
                .then((d) => {
                    console.log(d);
                    Util.loadIng(false);
                    $uibModalInstance.close();
                });
          }
      }
      $scope.cancel = () => {
          $uibModalInstance.close();
      }
  }
}
ModFileCtrl.$inject = ['$scope', '$uibModalInstance', 'data', 'Util', 'Cfg', 'Rest'];

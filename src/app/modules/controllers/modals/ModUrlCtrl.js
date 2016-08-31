'use strict';

export default class ModUrlCtrl {
  constructor($scope, $uibModalInstance, data) {
      $scope.urls = ["http://"];
      $scope.addUrl = () => {
          $scope.urls.push("");
      }
      $scope.removeUrl = (index) => {
          $scope.urls.splice(index, 1)
      }
      $scope.save = () => {
          console.log($scope.urls);
          $uibModalInstance.close();
      }
      $scope.cancel = () => {
          $uibModalInstance.close();
      }
  }
}
ModUrlCtrl.$inject = ['$scope', '$uibModalInstance', 'data'];

'use strict';

export default class MenuCtrl {
  constructor($scope, $location) {
      $scope.name = "app";
  }
}
MenuCtrl.$inject = ['$scope', '$location'];

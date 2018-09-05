(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', ['$scope', LunchCheckController]);

//LunchCheckController.$inject = ['$scope']; using first method instead
function LunchCheckController($scope) {


  $scope.lunchMessage = "Not yet decided";
  $scope.lunchList ="";
  $scope.count = 0;

  $scope.letsCheckIt = function () {
    $scope.count = splitItemsCount($scope.lunchList);
    console.log($scope.count);
    if ($scope.count == 0){
      $scope.lunchMessage = "Please enter data first";
    }else if ($scope.count < 4) {
      $scope.goodToGo();
    } else {
      $scope.tryAgain();
    }
  };



  $scope.tryAgain = function () {
    $scope.lunchMessage = "Too much!";
  };
  $scope.goodToGo = function () {
    $scope.lunchMessage = "Enjoy!";
  };

  function splitItemsCount(string) {
    var items = string.trim().split(/\s*,\s*/);
    //console.log(items);
    //console.log(items.filter(String));
    return items.filter(String).length;
  }


}

})();

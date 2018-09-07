(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['$scope','MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
    var menu = this;
    let promise;
    $scope.searchTerm ="";
    menu.getMatchedMenuItems = function (searchTerm) {
        console.log("Controller searchTerm param:",searchTerm);
        promise = MenuSearchService.getMatchedMenuItems();
        console.log("Controller Result: ",menu.items);
        promise.then(function (response) {
            menu.items = response.data;
            console.log("Controller Result#2: ",menu.items);
        });

    };



}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    let service = this;


    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        }).then(function (result) {
            let foundItems = result;
            //TODO
            console.log("Result: ",foundItems)
            return foundItems;

            });
    }


}


})();
(function (){
  'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingList', ShoppingListProvider)

ToBuyController.$inject = ['ShoppingList'];
function ToBuyController(ShoppingList) {
  var list = this;

  list.items = ShoppingList.getaAvailableItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    try {
      ShoppingList.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
  };

  list.buyItem = function (itemIndex) {
    ShoppingList.buyItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingList'];
function AlreadyBoughtController(ShoppingList) {
  var list = this;

  list.items = ShoppingList.getBoughtItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    try {
      ShoppingList.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
  };

  list.removeItem = function (itemIndex) {
    ShoppingList.removeItem(itemIndex);
  };
}



function ShoppingListService(maxItems, initialList) {
  var service = this;

  // List of shopping items
  var availableItems = initialList;
  var boughtItems = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (availableItems.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      availableItems.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    availableItems.splice(itemIndex, 1);
  };

  service.getaAvailableItems = function () {
    return availableItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.buyItem = function (itemIndex) {
    boughtItems.push(availableItems[itemIndex]);
    availableItems.splice(itemIndex, 1);
  }

}

function ShoppingListProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 100,
    initialList : [
      {
        name: "A",
        quantity :10},
      {
        name : "B",
        quantity :20},
      {
        name : "C",
        quantity :30},
      {
        name : "D",
        quantity :30},
      {
        name : "E",
        quantity :30}
      ]
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems, provider.defaults.initialList);
    return shoppingList;
  };
}

})();

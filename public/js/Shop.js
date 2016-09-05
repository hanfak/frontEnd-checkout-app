'use strict';

function Shop(stockList) {
  this.stockList = stockList;
  this.stockList.createProducts();
  this.cart = [];
}

Shop.prototype.showStock = function() {
  return this.stockList.getStock();
};

Shop.prototype.showCart= function() {
  return this.cart;
};

Shop.prototype.addToCart = function(product) {
  product.decreaseStock();
  this.cart.push(product);
};

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

Shop.prototype.removeFromCart = function(product) {
  var index = this.cart.indexOf(product);
  if (index > -1) {
    this.cart.splice(index, 1);
    product.increaseStock();
  } else {
    throw new Error('Product not in cart');
  }
};

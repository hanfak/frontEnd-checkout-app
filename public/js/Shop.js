'use strict';

function Shop(stockList, promoRules) {
  this.stockList = stockList;
  this.vouchers = promoRules;
  this.stockList.createProducts();
  this.cart = [];
}

Shop.prototype.showStock = function() {
  return this.stockList.getStock();
};

Shop.prototype.showCart= function() {
  return this.cart;
};

Shop.prototype.showVouchers= function() {
  return this.vouchers.getVouchers();
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

Shop.prototype.applyVoucherAndAddToCart = function(voucher) {
  if(this._checkforVoucher1(voucher)) {
    this.addToCart(voucher);
  }
  if(this._checkforVoucher2(voucher)) {
    this.addToCart(voucher);
  }
  if(this._checkforVoucher3(voucher)) {
    this.addToCart(voucher);
  }
};

Shop.prototype.totalOfCart = function() {
  var sum = this.showCart().reduce(addPrice, 0);

  function addPrice(a , b) {
    return a +  parseFloat(b.getPrice());
  }

  return sum.toFixed(2);
};

Shop.prototype._checkShoes = function() {
  var numberOfItems = this.cart.length;
  for (var i = 0; i < numberOfItems; i++) {
    if (this.cart[i].category.indexOf("Footwear") > -1) {
      return true;
    }
  }
  return false;
};

Shop.prototype._checkforVoucher1 = function(voucher) {
  return voucher.name === 'voucher1' && parseFloat(this.totalOfCart()) > 25.0;
};
Shop.prototype._checkforVoucher2 = function(voucher) {
  return voucher.name === 'voucher2' && parseFloat(this.totalOfCart()) > 50.0;
};
Shop.prototype._checkforVoucher3 = function(voucher) {
  return voucher.name === 'voucher3' && parseFloat(this.totalOfCart()) > 75.0 && this._checkShoes();
};

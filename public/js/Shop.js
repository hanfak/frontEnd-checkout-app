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
  if(product.getQuantity() > 0){
    product.decreaseStock();
    this.cart.push(product);
  } else {
    throw new Error('Cannot add to cart: Product is out of stock');
  }
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
  if(this.showCart().length === 0){
    throw new Error('No product in cart: Add a product first');
  }

  if(this.voucherHasBeenUsed()){
    throw new Error('Voucher has already been used - Can only apply one voucher at a time: Cannot apply voucher');
  }

  if(this._checkforVoucher1(voucher)) {
    this.addToCart(voucher);
  }

  if(voucher.getName() === 'voucher2') {
    if(this._checkforVoucher2()){
      this.addToCart(voucher);
    }
    else {
      throw new Error('Total of cart is under £50.00: Cannot apply voucher');
    }
  }

  if(voucher.getName() === 'voucher3') {
    if(this._checkforVoucher3()){
      this.addToCart(voucher);
    }
    else {
      throw new Error('Total of cart is under £75.00 and/or contains no footwear: Cannot apply voucher');
    }
  }
};

Shop.prototype.totalOfCart = function() {
  var sum = this.showCart().reduce(this._addPrice, 0);
  return sum.toFixed(2);
};

Shop.prototype.voucherHasBeenUsed = function() {
  var result = this.showVouchers().filter(function(voucher){
    return voucher.getQuantity() === 0;
  });
  return result.length > 0;
};

//PRIVATE METHODS


Shop.prototype._addPrice = function(a, b) {
  return  a +  parseFloat(b.getPrice());
};

Shop.prototype._checkShoes = function() {
  var numberOfItems = this.cart.length;
  for (var i = 0; i < numberOfItems; i++) {
    if (this.cart[i].getCategory().indexOf("Footwear") > -1) {
      return true;
    }
  }
  return false;
};

Shop.prototype._checkforVoucher1 = function(voucher) {
  return voucher.getName() === 'voucher1';
};

Shop.prototype._checkforVoucher2 = function(voucher) {
  return parseFloat(this.totalOfCart()) > 50.0;
};

Shop.prototype._checkforVoucher3 = function(voucher) {
  return  parseFloat(this.totalOfCart()) > 75.0 && this._checkShoes();
};

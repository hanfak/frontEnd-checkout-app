'use strict';

function Product(name, color, category, price, quantity) {
 this.name = name;
 this.color = color;
 this.category = category;
 this.price = price;
 this.quantity = quantity;
}

Product.prototype.decreaseStock = function() {
  this.quantity--;
};

Product.prototype.increaseStock = function() {
  this.quantity++;
};

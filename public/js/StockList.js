'use strict';

var stock = [
      {
         "name":"Almond Toe Court Shoes",
         "color":"Patent Black",
         "category":"Women’s Footwear",
         "price":"99.00",
         "quantity":"5"
      },
      {
         "name":"Suede Shoes",
         "color":"Blue",
         "category":"Women’s Footwear",
         "price":"42.00",
         "quantity":"4"
      },
      {
         "name":"Leather Driver Saddle Loafers",
         "color":"Tan",
         "category":"Men’s Footwear",
         "price":"34.00",
         "quantity":"12"
      },
      {
         "name":"Flip Flops",
         "color":"Red",
         "category":"Men's Footwear",
         "price":"19.00",
         "quantity":"6"
      },
      {
         "name":"Flip Flops",
         "color":"Blue",
         "category":"Men's Footwear",
         "price":"19.00",
         "quantity":"0"
      },
      {
         "name":"Gold Button Cardigan",
         "color":"Black",
         "category":"Women’s Casualwear",
         "price":"167.00",
         "quantity":"6"
      },
      {
         "name":"Cotton Shorts",
         "color":"Medium Red",
         "category":"Women’s Casualwear",
         "price":"30.00",
         "quantity":"5"
      },
      {
         "name":"Fine Stripe Short Sleeve Shirt",
         "color":"Grey",
         "category":"Men’s Casualwear",
         "price":"49.99",
         "quantity":"9"
      },
      {
         "name":"Fine Stripe Short Sleeve Shirt",
         "color":"Green",
         "category":"Men’s Casualwear",
         "price":"39.99",
         "quantity":"3"
      },
      {
         "name":"Sharkskin Waistcoat",
         "color":"Charcoal",
         "category":"Men’s Formalwear",
         "price":"75.00",
         "quantity":"2"
      },
      {
         "name":"Lightweight Patch Pocket Blazer",
         "color":"Deer",
         "category":"Men’s Formalwear",
         "price":"175.50",
         "quantity":"1"
      },
      {
         "name":"Bird Print Dress",
         "color":"Black",
         "category":"Women’s Formalwear",
         "price":"270.00",
         "quantity":"10"
      },
      {
         "name":"Mid Twist Cut - Out Dress",
         "color":"Pink",
         "category":"Women’s Formalwear",
         "price":"540.00",
         "quantity":"5"
      }
   ];

function StockList() {
 this.stock = stock;
 this.stockList  = [];
}

StockList.prototype.createProducts = function() {
  var stockProducts = [];
  stock.forEach(function(item, index) {
    stockProducts.push( new Product(item.name, item.color, item.category, item.price, parseInt(item.quantity) ) );
  });
  return this.stockList = stockProducts;
};

StockList.prototype.getStock = function() {
  return this.stockList;
};

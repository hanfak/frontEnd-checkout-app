var shop = new Shop(new StockList());

document.addEventListener("DOMContentLoaded", function() {
  printStockList();
});

function printStockList(){
  shop.showStock().forEach(function(product, index){
    return document.getElementById("stock-list").innerHTML +=
      "<div class='item'>" +
          _productDetails(product) +
          _addProductToCartButton(index) +
      '</div>';
  });
}

function addProduct(index) {
  _clearProductsAndCart();

  product = shop.showStock()[index];
  shop.addToCart(product);
  printStockList();

  document.getElementById("shopping-cart").innerHTML += '<h1>SHOPPING CART</h1>';

  shop.showCart().forEach(function(product, index){
    return document.getElementById("shopping-cart").innerHTML +=
      "<div class='item'>" + _productDetails(product) +
      '</div>';
  });
}

function _productDetails(product){
  return  '<p>Name:'            + product.name     +'</p>' +
          '<p>£'                + product.price    +'</p>' +
          '<p>Colour '          + product.color    +'</p>' +
          '<p>Description '     + product.category +'</p>' +
          '<p>Amount in Stock ' + product.quantity +'</p>';
}

function _addProductToCartButton(index) {
  return '<input class="add-btn" type="button" onclick="addProduct('+index+')" value="ADD PRODUCT"></input>';
}

function _clearProductsAndCart() {
  document.getElementById("stock-list").innerHTML = "";
  document.getElementById("shopping-cart").innerHTML = "";
}

var shop = new Shop(new StockList());

document.addEventListener("DOMContentLoaded", function() {
  _printStockAndCartItems();
});

function addProduct(index) {
  _clearProductsAndCart();
  product = shop.showStock()[index];
  shop.addToCart(product);
  _printStockAndCartItems();
}

function removeProduct(index) {
  _clearProductsAndCart();
  product = shop.showCart()[index];
  shop.removeFromCart(product);
  _printStockAndCartItems();
}

// Private methods
function _printStockAndCartItems(){
  _printStockItems();
  _printShoppingCartItems();
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

function _removeProductFromCartButton(index) {
  return '<input class="remove-btn" type="button"  onclick="removeProduct('+index+')" value="REMOVE PRODUCT"></input>';
}

function _shoppingCartHeading(){
  if(shop.showCart().length > 0){
    return document.getElementById("shopping-cart").innerHTML += '<h1>SHOPPING CART</h1>';
  }
}

function _printStockItems() {
  shop.showStock().forEach(function(product, index){
    return document.getElementById("stock-list").innerHTML +=
      "<div class='item'>" +
          _productDetails(product) +
          _addProductToCartButton(index) +
      '</div>';
  });
}

function _printShoppingCartItems() {
  _shoppingCartHeading();
  shop.showCart().forEach(function(product, index){
    return document.getElementById("shopping-cart").innerHTML +=
    "<div class='item'>"                  +
      _productDetails(product)            +
      _removeProductFromCartButton(index) +
     '</div>';
  });
}

function _clearProductsAndCart() {
  document.getElementById("stock-list").innerHTML = "";
  document.getElementById("shopping-cart").innerHTML = "";
}

var shop = new Shop(new StockList(), new PromoRules());

document.addEventListener("DOMContentLoaded", function() {
  _printItemsVouchersAndTotal();
});

function addProduct(index) {
  _clearProductsAndCart();
  product = shop.showStock()[index];
  shop.addToCart(product);
  _printItemsVouchersAndTotal();
}

function addVoucher(index) {
  _clearProductsAndCart();
  voucher = shop.showVouchers()[index];
  shop.applyVoucherAndAddToCart(voucher);
  _printItemsVouchersAndTotal();
}

function removeProduct(index) {
  _clearProductsAndCart();
  product = shop.showCart()[index];
  shop.removeFromCart(product);
  _printItemsVouchersAndTotal();
}

// Private methods

function _printItemsVouchersAndTotal(){
  _totalOfCart();
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

function _printStockItems() {
  shop.showStock().forEach(function(product, index){
    return document.getElementById("stock-list").innerHTML +=
      "<div class='item'>" +
        _productDetails(product) +
        _addProductToCartButton(index) +
      '</div>';
  });
}

function _addVoucherToCartButton(index) {
  return '<input class="add-btn" type="button" onclick="addVoucher('+index+')" value="ADD VOUCHER"></input>';
}

function _displayVouchers(){
  shop.showVouchers().forEach(function(product, index){
    return document.getElementById("vouchers").innerHTML +=
      "<div class='voucher'>" +
      '<p>Name:'            + product.name     +'</p>' +
      '<p>£'                + product.price * -1   +'</p>' +
        _addVoucherToCartButton(index) +
      '</div>';
  });
}

function _totalOfCart() {
  if(shop.showCart().length > 0){
    _displayVouchers();
    return document.getElementById("total").innerHTML +=
      '<h1>TOTAL</h1>' +
      '<p>£' + shop.totalOfCart() + '</p>';
  }
}

function _shoppingCartHeading(){
  if(shop.showCart().length > 0){
    return document.getElementById("shopping-cart").innerHTML += '<h1>SHOPPING CART</h1>';
  }
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
  document.getElementById("total").innerHTML = "";
  document.getElementById("vouchers").innerHTML = "";
}

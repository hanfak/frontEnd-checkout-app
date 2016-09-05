var shop = new Shop(new StockList());

document.addEventListener("DOMContentLoaded", function() {
  printStockList();
});

function printStockList(){
  shop.showStock().forEach(function(product, index){
    return document.getElementById("stock-list").innerHTML +=
      "<div class='item'>" +
        '<p>Name:'            + product.name     +'</p>' +
        '<p>£'                + product.price    +'</p>' +
        '<p>Colour '          + product.color    +'</p>' +
        '<p>Description '     + product.category +'</p>' +
        '<p>Amount in Stock ' + product.quantity +'</p>' +
        "<input class='add-btn' type='button' value='ADD PRODUCT'></input>" +
      '</div>';
  });
}

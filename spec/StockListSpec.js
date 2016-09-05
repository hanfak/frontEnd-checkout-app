describe("StockList", function() {
  var stockList;

  beforeEach(function() {
    stockList = new StockList();
  });

  it("initialize with list of stock", function() {
    expect(stockList.stock.length).toEqual(13);
  });

  it("initialize with list of products", function() {
    expect(stockList.getStock()).toEqual([]);
  });

  it("creates a list of products from the stock", function() {
    stockList.createProducts();
    expect(stockList.getStock().length).toEqual(13);
  });
});

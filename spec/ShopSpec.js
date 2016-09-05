describe("Shop", function() {
  var shop, stockList, product1, product2, products;

  beforeEach(function() {
    product1 = jasmine.createSpyObj('product', ['decreaseStock']);
    product2 = jasmine.createSpyObj('product', ['decreaseStock']);
    products = [product1, product2];

    stockList = jasmine.createSpyObj('stockList', ['createProducts', 'getStock']);
    stockList.createProducts.and.returnValue(products);
    stockList.getStock.and.returnValue(products);

    shop = new Shop(stockList);
  });

  it("calls createProducts to create list of products", function() {
    expect(stockList.createProducts).toHaveBeenCalled();
  });

  describe("#showStock",function(){
    it("calls getStock to retrieve list of products in stock", function() {
      shop.showStock();
      
      expect(stockList.getStock).toHaveBeenCalled();
    });

    it("returns the list of products in stock", function() {
      expect(shop.showStock()).toEqual(products);
    });
  });

  describe("#showStock",function(){
    it("has no products in cart at start", function() {
      expect(shop.showStock()).toEqual(products);
    });
  });

  describe("#addToCart",function(){
    it("calls decreaseStock", function() {
      shop.addToCart(product1);

      expect(product1.decreaseStock).toHaveBeenCalled();
    });

    it("adds product to the cart", function() {
      shop.addToCart(product1);

      expect(shop.showCart()).toEqual([product1]);
    });
  });
});

describe("Product", function() {
  var product;

  beforeEach(function() {
    product = new Product("Almond Toe Court Shoes" , "Patent Black", "Women’s Footwear", "99.00", 5);
  });

  it("initialize with name", function() {
    expect(product.name).toEqual("Almond Toe Court Shoes");
  });

  it("initialize with colour", function() {
    expect(product.color).toEqual("Patent Black");
  });

  it("initialize with category", function() {
    expect(product.category).toEqual("Women’s Footwear");
  });

  it("initialize with price", function() {
    expect(product.price).toEqual("99.00");
  });

  it("initialize with quantity", function() {
    expect(product.quantity).toEqual(5);
  });

});

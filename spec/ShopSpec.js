describe("Shop", function() {
  var shop, stockList, product1, product2, product3, product4, products;

  beforeEach(function() {
    product1 = jasmine.createSpyObj('product1', ['decreaseStock', 'increaseStock', 'getPrice', 'getCategory']);
    product2 = jasmine.createSpyObj('product2', ['decreaseStock', 'increaseStock', 'getPrice', 'getCategory']);
    product3 = jasmine.createSpyObj('product3', ['decreaseStock', 'increaseStock', 'getPrice', 'getCategory']);
    product4 = jasmine.createSpyObj('product4', ['decreaseStock', 'increaseStock', 'getPrice', 'getCategory']);
    product1.getPrice.and.returnValue("99.00");
    product1.getCategory.and.returnValue("Women’s Footwear");
    product2.getPrice.and.returnValue("39.99");
    product2.getCategory.and.returnValue("Men’s Casualwear");
    product3.getPrice.and.returnValue("175.50");
    product3.getCategory.and.returnValue("Men’s Formalwear");
    product4.getPrice.and.returnValue("19.00");
    product4.getCategory.and.returnValue("Men’s Footwear");

    stockList = jasmine.createSpyObj('stockList', ['createProducts', 'getStock']);
    products = [product1, product2, product3];
    stockList.createProducts.and.returnValue(products);
    stockList.getStock.and.returnValue(products);

    promoRules = jasmine.createSpyObj('promoRules', ['getVouchers']);
    voucher1 = jasmine.createSpyObj('voucher1', ['decreaseStock', 'increaseStock', 'getPrice', 'getName']);
    voucher2 = jasmine.createSpyObj('voucher2', ['decreaseStock', 'increaseStock', 'getPrice', 'getName']);
    voucher3 = jasmine.createSpyObj('voucher3', ['decreaseStock', 'increaseStock', 'getPrice', 'getName']);
    voucher1.getPrice.and.returnValue("-5.00");
    voucher1.getName.and.returnValue("voucher1");
    voucher2.getPrice.and.returnValue("-10.00");
    voucher2.getName.and.returnValue("voucher2");
    voucher3.getPrice.and.returnValue("-15.00");
    voucher3.getName.and.returnValue("voucher3");

    promoRules.getVouchers.and.returnValue([voucher1, voucher2, voucher3]);

    shop = new Shop(stockList, promoRules);
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

  describe("#showVouchers",function(){
    it('calls getVouchers when asking for list of vouchers', function(){
      shop.showVouchers();
      expect(promoRules.getVouchers).toHaveBeenCalled();
    });

    it('returns a list of vouchers', function(){
      expect(shop.showVouchers()[0].getPrice()).toEqual("-5.00");
      expect(shop.showVouchers()[1].getPrice()).toEqual("-10.00");
      expect(shop.showVouchers()[2].getPrice()).toEqual("-15.00");
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

  describe("#removeFromCart",function(){
    it("calls increaseStock", function() {
      shop.addToCart(product1);

      shop.removeFromCart(product1);

      expect(product1.increaseStock).toHaveBeenCalled();
    });

    it("removes product from the cart", function() {
      shop.addToCart(product1);

      shop.removeFromCart(product1);

      expect(shop.showCart()).toEqual([]);
    });

    it("does not remove product from the cart if not in cart", function() {
      result = function(){
        shop.removeFromCart(product1);
      };

      expect(result).toThrowError('Product not in cart');
    });

    it("removes a specific product from a cart filled with different products", function() {
      shop.addToCart(product1);
      shop.addToCart(product2);
      shop.removeFromCart(product1);

      expect(shop.showCart()).toEqual([product2]);
    });

    it("removes voucher from the cart", function() {
      shop.addToCart(product1);
      shop.applyVoucherAndAddToCart(voucher2);

      shop.removeFromCart(voucher2);

      expect(shop.showCart()).toEqual([product1]);
    });

  });

  describe("#totalOfCart",function(){
    it('returns the total of empty cart as £0.00', function(){
      expect(shop.totalOfCart()).toEqual('0.00');
    });

    it('returns the total of one item in cart', function(){
      shop.addToCart(product1);

      expect(shop.totalOfCart()).toEqual('99.00');
    });

    it('returns the total of multiple items in cart', function(){
      shop.addToCart(product1);
      shop.addToCart(product2);
      shop.addToCart(product1);
      expect(shop.totalOfCart()).toEqual('237.99');
    });

    it('returns correct total after adding and remove products to cart', function(){
      shop.addToCart(product1);
      shop.addToCart(product2);
      shop.removeFromCart(product1);
      shop.addToCart(product3);

      expect(shop.totalOfCart()).toEqual('215.49');
    });

  });

  describe('#applyVoucherAndAddToCart', function(){
    describe("voucher1", function(){
      it('returns correct total after using voucher1', function(){
        shop.addToCart(product1);
        shop.applyVoucherAndAddToCart(voucher1);

        expect(shop.totalOfCart()).toEqual('94.00');
      });
    });

    describe("voucher2", function(){
      it('returns correct total', function(){
        shop.addToCart(product1);
        shop.applyVoucherAndAddToCart(voucher2);

        expect(shop.totalOfCart()).toEqual('89.00');
      });

      it('does not apply', function(){
        shop.addToCart(product4);
        shop.applyVoucherAndAddToCart(voucher2);

        expect(shop.totalOfCart()).toEqual('19.00');
      });
    });


    describe("voucher3", function(){
      it('returns correct total', function(){
        shop.addToCart(product1);
        shop.applyVoucherAndAddToCart(voucher3);

        expect(shop.totalOfCart()).toEqual('84.00');
      });

      it('deos not apply if under £75 and shoes included', function(){
        shop.addToCart(product4);
        shop.applyVoucherAndAddToCart(voucher3);

        expect(shop.totalOfCart()).toEqual('19.00');
      });

      it('deos not apply if over £75 and no shoes included', function(){
        shop.addToCart(product3);
        shop.applyVoucherAndAddToCart(voucher3);

        expect(shop.totalOfCart()).toEqual('175.50');
      });

      it('deos not apply if no shoes and under £75', function(){
        shop.addToCart(product4);
        shop.addToCart(product2);
        shop.applyVoucherAndAddToCart(voucher3);

        expect(shop.totalOfCart()).toEqual('58.99');
      });
    });

  });
});

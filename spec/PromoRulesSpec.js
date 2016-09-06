describe("PromoRules", function(){
  beforeEach(function(){
    promoRules = new PromoRules();
  });

  describe("#initialize", function(){
    it('has three vouchers when initialized', function(){
      result = promoRules.getVouchers();

      expect(result.length).toEqual(3);
    });
  });

  describe("#getVouchers", function(){
    it("returns the list of vouchers as products", function(){
        result = promoRules.getVouchers();

        expect(result[0]).toEqual(jasmine.any(Product));
        expect(result[1]).toEqual(jasmine.any(Product));
        expect(result[2]).toEqual(jasmine.any(Product));
    });

    it("returns the list of vouchers with negative prices", function(){
        result = promoRules.getVouchers();

        expect(result[0].getPrice()).toEqual('-5.00');
        expect(result[1].getPrice()).toEqual('-10.00');
        expect(result[2].getPrice()).toEqual('-15.00');
    });
  });
});

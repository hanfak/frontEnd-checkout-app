function PromoRules() {
  this.voucherList =[
    new Product('voucher1', 'N/A', 'voucher', "-5.00", 1),
    new Product('voucher2', 'N/A', 'voucher', "-10.00", 1),
    new Product('voucher3', 'N/A', 'voucher', "-15.00", 1)
  ];
}

PromoRules.prototype.getVouchers= function() {
  return this.voucherList;
};

// voucherIsValid?
// Maybe create a new object for testing rules and sending the right voucher to add

import assert from 'assert';

class Dollar {
  amount
  constructor(amount: number) {
    this.amount = amount
  }
  times(multiplier: number) {
    return new Dollar(this.amount * multiplier)
  }
}
let fiver = new Dollar(5);
let tenner = fiver.times(2); 
assert.strictEqual(tenner.amount, 10);
console.log('test_money:')
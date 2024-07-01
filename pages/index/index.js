const acc = require('../../qjzhalx/accurate.js');
Page({
  data: {
    displayValue: '0',
    currentOperator: ''
  },
  currentResult: null,
  shouldClear: false,
  onNumberPress(e) {
    const value = e.target.dataset.val;
    if (this.data.displayValue === '0' || this.shouldClear) {
      this.setData({ displayValue: value });
      this.shouldClear = false;
    } else {
      this.setData({ displayValue: this.data.displayValue + value });
    }
  },
  onOperatorPress(e) {
    const operator = this.data.currentOperator;
    const value = Number(this.data.displayValue);
    this.setData({ currentOperator: e.target.dataset.val });
    if (this.shouldClear) {
      return;
    }
    this.shouldClear = true;
    if (this.currentResult === null) {
      this.currentResult = value;
      return;
    }
    switch (operator) {
      case '+':
        this.currentResult = acc.add(this.currentResult, value);
        break;
      case '-':
        this.currentResult = acc.sub(this.currentResult, value);
        break;
      case '*':
        this.currentResult = acc.mul(this.currentResult, value);
        break;
      case '/':
        this.currentResult = acc.div(this.currentResult, value);
        break;
      case '%':
        this.currentResult = this.currentResult % value;
        break;
    }
    this.setData({ displayValue: this.currentResult + '' });
  },
  onDotPress() {
    if (this.shouldClear) {
      this.setData({ displayValue: '0.' });
      this.shouldClear = false;
      return;
    }
    if (this.data.displayValue.indexOf('.') >= 0) {
      return;
    }
    this.setData({ displayValue: this.data.displayValue + '.' });
  },
  onDeletePress() {
    const value = this.data.displayValue.slice(0, -1);
    this.setData({ displayValue: value === '' ? '0' : value });
  },
  onResetPress() {
    this.currentResult = null;
    this.shouldClear = false;
    this.setData({ displayValue: '0', currentOperator: '' });
  }
});

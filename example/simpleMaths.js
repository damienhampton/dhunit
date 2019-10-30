'use strict'
const assert = require('chai').assert;
const { TestCase, TestSuite, TestResult } = require('../dhUnit');

function SimpleMaths(name){
  TestCase.call(this, name)
}

SimpleMaths.prototype = Object.create(TestCase.prototype);

SimpleMaths.prototype.addTwoIntegers = function(){
  assert.equal(5, 2 + 3);
}

//Example of failing test
SimpleMaths.prototype.addTwoIntegersDeliberateFail = function(){
  assert.equal(5, 6 + 3);
}

const suite = new TestSuite();
suite.add(new SimpleMaths('addTwoIntegers'));
suite.add(new SimpleMaths('addTwoIntegersDeliberateFail'));
const result = new TestResult();
suite.run(result);
console.log(result.summary());
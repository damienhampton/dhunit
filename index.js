'use strict'
const assert = require('chai').assert;

function TestCase(name){
  this.name = name;
}

TestCase.prototype.run = function(){
  const method = this[this.name].bind(this);
  method();
}

function WasRun(name){
  this.wasRun = false;
  TestCase.call(this, name);
}

WasRun.prototype = Object.create(TestCase.prototype);

WasRun.prototype.testMethod = function(){
  this.wasRun = true;
}

function TestCaseTest(name){
  TestCase.call(this, name);
}

TestCaseTest.prototype = Object.create(TestCase.prototype);

TestCaseTest.prototype.testRunning = function(){
  const test = new WasRun('testMethod');
  assert.isFalse(test.wasRun);
  test.run();
  assert.isTrue(test.wasRun);
}

new TestCaseTest('testRunning').run();
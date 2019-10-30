'use strict'
const assert = require('chai').assert;

function TestCase(name){
  this.name = name;
}

TestCase.prototype.setUp = function(){
  //nothing
}

TestCase.prototype.run = function(){
  this.setUp();
  const method = this[this.name].bind(this);
  method();
}

function WasRun(name){
  this.wasSetUp = false;
  TestCase.call(this, name);
}

WasRun.prototype = Object.create(TestCase.prototype);

WasRun.prototype.setUp = function(){
  this.wasRun = false;
  this.wasSetUp = true;
  this.log = 'setUp '
}

WasRun.prototype.testMethod = function(){
  this.wasRun = true;
  this.log += 'testMethod ';
}

function TestCaseTest(name){
  TestCase.call(this, name);
}

TestCaseTest.prototype = Object.create(TestCase.prototype);

TestCaseTest.prototype.testTemplateMethod = function(){
  const test = new WasRun('testMethod');
  test.run();
  assert.equal('setUp testMethod ', test.log);
}

new TestCaseTest('testTemplateMethod').run();
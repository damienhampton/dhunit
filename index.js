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
}

WasRun.prototype.testMethod = function(){
  this.wasRun = true;
}

function TestCaseTest(name){
  TestCase.call(this, name);
}

TestCaseTest.prototype = Object.create(TestCase.prototype);

TestCaseTest.prototype.setUp = function(){
  this.test = new WasRun('testMethod');
}

TestCaseTest.prototype.testRunning = function(){
  this.test.run();
  assert.isTrue(this.test.wasRun);
}

TestCaseTest.prototype.testSetUp = function(){
  this.test.run();
  assert.isTrue(this.test.wasSetUp);
}

new TestCaseTest('testRunning').run();
new TestCaseTest('testSetUp').run();
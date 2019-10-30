'use strict'
const assert = require('chai').assert;

const { TestCase, TestSuite, TestResult } = require('../dhUnit');

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

WasRun.prototype.testBrokenMethod = function(){
  throw Error('testBrokenMethod');
}

WasRun.prototype.tearDown = function(){
  this.log += 'tearDown ';
}

function TestCaseTest(name){
  TestCase.call(this, name);
}

TestCaseTest.prototype = Object.create(TestCase.prototype);

TestCaseTest.prototype.setUp = function(){
  this.result = new TestResult();
}

TestCaseTest.prototype.testTemplateMethod = function(){
  const test = new WasRun('testMethod');
  test.run(this.result);
  assert.equal('1 run, 0 failed', this.result.summary());
}

TestCaseTest.prototype.testFailedResult = function(){
  const test = new WasRun('testBrokenMethod');
  test.run(this.result);
  assert.equal('1 run, 1 failed', this.result.summary());
}

TestCaseTest.prototype.testFailedResultFormatting = function(){
  this.result.testStarted();
  this.result.testFailed();
  assert.equal('1 run, 1 failed', this.result.summary());
}

TestCaseTest.prototype.testSuite = function(){
  const suite = new TestSuite();
  suite.add(new WasRun('testMethod'));
  suite.add(new WasRun('testBrokenMethod'));
  suite.run(this.result);
  assert.equal('2 run, 1 failed', this.result.summary());
}

const suite = new TestSuite();
suite.add(new TestCaseTest('testTemplateMethod'));
suite.add(new TestCaseTest('testFailedResult'));
suite.add(new TestCaseTest('testFailedResultFormatting'));
suite.add(new TestCaseTest('testSuite'));
const result = new TestResult();
suite.run(result);
console.log(result.summary());

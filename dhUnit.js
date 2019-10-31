'use strict'
module.exports = {
  TestSuite,
  TestCase,
  TestResult
}

function TestSuite(){
  this.tests = [];
}

TestSuite.prototype.add = function(test){
  this.tests.push(test);
}

TestSuite.prototype.run = function(result){
  this.tests.forEach(test => {
    test.run(result);
  })
}

function TestCase(name){
  this.name = name;
}

TestCase.prototype.setUp = function(){
  //nothing
}

TestCase.prototype.tearDown = function(){
  //nothing
}

TestCase.prototype.run = function(result){
  result.testStarted();
  this.setUp();
  try{
    const method = this[this.name].bind(this);
    method();
  }catch(e){
    result.testFailed();
  }
  this.tearDown();
  return result;
}

function TestResult(){
  this.runCount = 0;
  this.errorCount = 0;
}
TestResult.prototype.testStarted = function(){
  this.runCount += 1;
}
TestResult.prototype.testFailed = function(){
  this.errorCount += 1;
}
TestResult.prototype.summary = function(){
  return `${this.runCount} run, ${this.errorCount} failed`;
}
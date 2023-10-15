(function (win) {
  'use strict';

  function DOM(selector) {
    this.$elements = document.querySelectorAll(selector);
  }

  DOM.prototype.get = function get() {
    return this.$elements;
  }

  DOM.prototype.getIndex = function getIndex(ind = 0) {
    return this.$elements[ind];
  }

  DOM.prototype.on = function on(eventType, callback) {
    Array.prototype.forEach.call(this.$elements, function ($element) {
      $element.addEventListener(eventType, callback, false);
    })
  }

  DOM.prototype.off = function off(eventType, callback) {
    Array.prototype.forEach.call(this.$elements, function ($element) {
      $element.removeEventListener(eventType, callback, false);
    })
  }

  DOM.prototype.call = function call(name, callback) {
    return Array.prototype[name].call(this.$elements, callback);
  }

  DOM.prototype.forEach = function forEach(callback) {
    this.call('forEach', callback);
  }

  DOM.prototype.map = function map(callback) {
    this.call('map', callback);
  }

  DOM.prototype.filter = function filter(callback) {
    this.call('filter', callback);
  }

  DOM.prototype.reduce = function reduce(callback) {
    this.call('reduce', callback);
  }

  DOM.prototype.reduceRight = function reduceRight(callback) {
    this.call('reduceRight', callback);
  }

  DOM.prototype.every = function every(callback) {
    this.call('every', callback);
  }

  DOM.prototype.some = function some(callback) {
    this.call('some', callback);
  }

  DOM.getType = function (element) {
    return Object.prototype.toString.apply(element)
      .replace(/^(\[object\s)|(\])$/g, '');
  }

  DOM.isArray = function (element) {
    return this.getType(element) === 'Array';
  }
  DOM.isObject = function (element) {
    return this.getType(element) === 'Object';
  }
  DOM.isFunction = function (element) {
    return this.getType(element) === 'Function';
  }
  DOM.isNumber = function (element) {
    return this.getType(element) === 'Number';
  }
  DOM.isString = function (element) {
    return this.getType(element) === 'String';
  }
  DOM.isBoolean = function (element) {
    return this.getType(element) === 'Boolean';
  }
  DOM.isNull = function (element) {
    const type = this.getType(element);
    return type === 'Null' || type === 'Undefined';
  }

  win.DOM = DOM;
})(window);
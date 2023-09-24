/*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.

Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.

Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]); // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false

Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/

(function() {
	'use strict';
	
	function DOM (selector) {
		this.$elements = document.querySelectorAll(selector);
	}
	
	DOM.prototype.get = function get() {
		return this.$elements;
	}

	DOM.prototype.on = function on(eventType, callback) {
		Array.prototype.forEach.call(this.$elements, function($element) {
			$element.addEventListener(eventType, callback, false);
		})
	}

	DOM.prototype.off = function off(eventType, callback) {
		Array.prototype.forEach.call(this.$elements, function($element) {
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
	
	DOM.getType = function(element) {
		return Object.prototype.toString.call(element)
			.replace(/^(\[object\s)|(\])$/g, '')
	}

	DOM.isArray = function(element) {
		return this.getType(element) === 'Array';
	}
	DOM.isObject = function(element) {
		return this.getType(element) === 'Object';
	}
	DOM.isFunction = function(element) {
		return this.getType(element) === 'Function';
	}
	DOM.isNumber = function(element) {
		return this.getType(element) === 'Number';
	}
	DOM.isString = function(element) {
		return this.getType(element) === 'String';
	}
	DOM.isBoolean = function(element) {
		return this.getType(element) === 'Boolean';
	}
	DOM.isNull = function(element) {
		return this.getType(element) === 'Null';
	}

	var $a = new DOM('[data-js="link"]');
	$a.on('click', function handleClick(e) {
		e.preventDefault();
		console.log('clicou');
		$a.off('click', handleClick);
	});
	
	console.log('isNull', DOM.isNull(null))

	console.log('Elementos selecionados:', $a.get());
	console.log('$a é filho de body?', $a.get()[0].parentNode === document.body);
})();

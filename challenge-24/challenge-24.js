/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/
(function(win, doc) {
	'use strict';

  var $output = doc.querySelector('.output');
  var $result = doc.querySelector('.result');
  var $clear = doc.querySelector('.clear');

  var $actions = doc.querySelectorAll('.action');
	
	var operations = {
		'+': function(accumulator) {
			return function(currentValue) {
				return accumulator + currentValue;
			}
		},
		'-': function(accumulator) {
			return function(currentValue) {
				return accumulator - currentValue;
			}
		},
		'x': function(accumulator) {
			return function(currentValue) {
				return accumulator * currentValue;
			}
		},
		'÷': function(accumulator) {
			return function(currentValue) {
				return accumulator / currentValue;
			}
		},
	};

  function getResult(value) {
		var calc = value
			.replace(/\D$/, '')
			.match(/(?:\d)+|(?:\D)/g);

    return calc.reduce(function(lastResult, currentValue) {
			if(operations[currentValue]) {
				 return operations[currentValue](lastResult);
			}
			if (typeof lastResult === 'function') {
				return lastResult(Number(currentValue));
			}
			return Number(currentValue);
		}, 0)
  }

  function clearInput(value) {
    return value
			.replace(/^[x÷]/, '')
      .replace(/[^1-9+\-x÷]/g, '')
      .replace(/([+\-x÷])+(?=[+\-x÷])/g, '');
  }

  function updateInput(value) {
    if (!value) {
    	$output.value = '0';
    	return $result.setAttribute('disabled', true);
    }
    $output.value = value;
		return $result.removeAttribute('disabled');
  }
  
	function handleClickAction(event) {
		var action = event.target.dataset.action;
		if ($output.value === '0' && $output.value === action) return;
		updateInput(clearInput($output.value + action));
	}
	
	function handleClickResult() {
    updateInput(getResult($output.value));
  }
	
	function handleClickClear() {
    updateInput();
  }

  function init() {
    Array.prototype.forEach.call($actions, function($button) {
      $button.addEventListener('click', handleClickAction);
    });
    $result.addEventListener('click', handleClickResult);
    $clear.addEventListener('click', handleClickClear);
  }

  init()
})(window, document)

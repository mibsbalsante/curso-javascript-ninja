(function() {
	/*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */
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
		return Object.prototype.toString.apply(element)
			.replace(/^(\[object\s)|(\])$/g, '');
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
		const type = this.getType(element);
		return type === 'Null' || type === 'Undefined';
	}
	
	var request = new XMLHttpRequest();
	
	var $cep = new DOM('[data-js="cep"]');
	var $form = new DOM('[data-js="form"]');
	
	var cep;
	
	function handleFormatData(data) {
		var address;
		
		try {
			address = JSON.parse(data);	
		} catch (e) {
			address = null;
		}
		
		return address;
	}
	
	function handleAddress(data) {
		var address = handleFormatData(data);
		
		if (!address) {
			handleMessage('error');
			return;
		}
		
		var $fields = new DOM('[data-js="field"]');
		$fields.forEach(function($field) {
			$field.textContent = address[$field.dataset.name] || '';
		})
		
		handleMessage('success');
	}
	
	function handleMessage(type) {
		var message = {
			loading: `Buscando informações para o CEP ${cep}...`,
			error: `Não encontramos o endereço para o CEP ${cep}.`,
			success: `Endereço referente ao CEP ${cep}:`,
		};
		var $message = new DOM('[data-js="message"]');
		$message.get()[0].textContent = message[type];
	}
	
	function handleSubmitForm(event) {
		event.preventDefault();
		cep = $cep.get()[0].value;
		handleMessage('loading');
		
		request.onload = function() {
			handleAddress(this.responseText);
		}
	
		request.onerror = function() {
			handleMessage('error');
		}
	
		request.open('get', `https://viacep.com.br/ws/${cep}/json/`);
		request.send();
	}
	
	$form.on('submit', handleSubmitForm);
})();

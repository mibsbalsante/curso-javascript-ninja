(function (DOM) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function handleSubmit(event) {
    event.preventDefault();

    var $fields = new DOM('[data-js="field"]');
    var $tableBody = new DOM('[data-js="tableBody"]').getIndex(0);
    var $row = document.createElement('tr');

    $fields.forEach(function ($field) {
      var $td = document.createElement('td');
      $td.textContent = $field.value;
      $row.appendChild($td);

      $field.value = '';
    });

    $tableBody.appendChild($row);
  }

  function handleSetAppData(data) {
    var $name = new DOM('[data-js="companyName"]').getIndex(0);
    var $phone = new DOM('[data-js="companyPhone"]').getIndex(0);

    try {
      var appData = JSON.parse(data);
      $name.textContent = appData.name;
      $phone.textContent = appData.phone;
    } catch (e) {
      console.error('Arquivo em formato incorreto!');
    }
  }

  function handleRequestAppData() {
    var request = new XMLHttpRequest();

    request.onload = function xhrOnLoad() {
      handleSetAppData(this.responseText);
    }

    request.onerror = function xhrOnError() {
      console.error('Arquivo não encontrado!')
    }

    request.open('get', './company.json');
    request.send();
  }

  function app() {
    var $form = new DOM('[data-js="form"]');
    $form.on('submit', handleSubmit);

    handleRequestAppData();
  }

  app();
})(window.DOM);

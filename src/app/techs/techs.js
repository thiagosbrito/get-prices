angular
  .module('app')
  .component('fountainTechs', {
    templateUrl: 'app/techs/techs.html',
    controller: TechsController,
    controllerAs: 'prices'
  })

/** @ngInject */
function TechsController($http, $scope, ngProgressFactory, $sce, DTOptionsBuilder, DTColumnBuilder, $timeout, ExcelAPI, $q, $window) {
  var vm = this;

  vm.teste = 'Teste';
  vm.priceList = null;

  $scope.contained_progressbar = ngProgressFactory.createInstance();
	$scope.contained_progressbar.setParent(document.getElementById('progress-bar'));
	$scope.contained_progressbar.setAbsolute();

  $scope.start_contained = function() {
		$scope.contained_progressbar.start();
	}
	$scope.complete_contained = function() {
		$scope.contained_progressbar.complete();
	}
	$scope.reset_contained = function() {
		$scope.contained_progressbar.reset();
	}
  vm.priceList = [];

  var url = '/prices';

  vm.GetSku = function (tamanho) {
    var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var aleatorio = '';
    for (var i = 0; i < tamanho; i++) {
        var rnum = Math.floor(Math.random() * letras.length);
        aleatorio += letras.substring(rnum, rnum + 1);
    }
    return aleatorio;
  }
  {

  }
  vm.GetPrices = function ($event) {
    $scope.contained_progressbar.start();
    var defer = $q.defer();
    $http.get(url).then(function(result) {
      angular.forEach(result.data.data, function (value) {
        data = {
          id: "",
          tipo: "sem-variacao",
          skuPai: "",
          sku: vm.GetSku(9).toUpperCase(),
          ativo: "N",
          usado: "N",
          ncm: "",
          gtin: "",
          nome: value[2].replace(/<(?:.|\n)*?>/gm, '').replace(',','.'),
          descricaoCompleta: value[2].replace(/<(?:.|\n)*?>/gm, '').replace(',','.'),
          urlVideoYoutube: "",
          estoqueGerenciado: "",
          estoqueQuantidade: "",
          estoqueSituacaoEmEstoque: "",
          estoqueSituacaoSemEstoque: "",
          precoSobConsulta: "",
          precoCusto: parseFloat(value[4].replace('US$ ','').replace(',','.')).toFixed(2),
          precoCheio: parseFloat(value[4].replace('US$ ','').replace(',','.') * 5.69).toFixed(2),
          precoPromocional: parseFloat(value[4].replace('US$ ','').replace(',','.') * 5.18).toFixed(2),
          marca: "",
          pesoEmKg: "",
          alturaEmCm: "",
          larguraEmCm: "",
          comprimentoEmCm: "",
          categoriaNomeNivel1: value[3],
          categoriaNomeNivel2: "",
          categoriaNomeNivel3: "",
          categoriaNomeNivel4: "",
          categoriaNomeNivel5: "",
          imagem1: "http://www.pioneerinter.com/img/uploads/1000x1000/products/" + value[1],
          imagem2: "",
          imagem3: "",
          imagem4: "",
          imagem5: "",
          gradeGenero: "",
          gradeTamanhoDeAnelalianca: "",
          gradeTamanhoDeCalca: "",
          gradeTamanhoDeCamisacamiseta: "",
          gradeTamanhoDeCapacete: "",
          gradeTamanhoDeTenis: "",
          gradeVoltagem: "",
          gradeTamanhoJuvenilInfantil: "",
          gradeProdutoComUmaCor: "",
          gradeProdutoComDuasCores: "",
          urlAntiga: "",
          seoTagTitle: 'Bestway Online - Produtos Importados',
          seoTagDescription: value[2].replace(/<(?:.|\n)*?>/gm, '').replace(',','.')
          // sku: vm.GetSku(9).toUpperCase(),
          // tipo: 'sem-variacao',
          // nome: value[2].replace(/<(?:.|\n)*?>/gm, '').replace(',','.'),
          // ativo: 'N',
          // precoCusto: parseFloat(value[4].replace('US$ ','').replace(',','.')).toFixed(2),
          // precoCheio: parseFloat(value[4].replace('US$ ','').replace(',','.') * 5.69).toFixed(2),
          // precoPromocional: parseFloat(value[4].replace('US$ ','').replace(',','.') * 5.18).toFixed(2),
          // imagem: 'http://www.pioneerinter.com/img/uploads/1000x1000/products/' + value[1],
          // seoTagTitle: 'Bestway Online - Produtos Importados'
          // seoTagDescription: "aliexpress,produtos importados dos estados unidos,produtos importados para revender,produtos importados da china,site de produtos importados baratos,comprar produtos importados do eua,sites de produtos importados,amazon produtos importados,lojas da china"
        };
        data.imagem1 != 'http://www.pioneerinter.com/img/uploads/1000x1000/products/no/no-img.jpg' ? vm.priceList.push(data) : false
      })
      defer.resolve(vm.priceList)
    });
    $scope.contained_progressbar.complete();
    return defer.promise;
  };

  vm.dtOptions = DTOptionsBuilder.newOptions()
    .withPaginationType('full_numbers')
    .withDisplayLength(10)
    .withBootstrap()
    .withOption('processing', true);


  vm.DownloadFile = function (tableId) {
    var exportHref = ExcelAPI.tableToExcel(tableId,'lista-de-precos.xlsx').then(
      function (res) {
        $window.location.href = res
      }
    )
  }
}

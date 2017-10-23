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
  };


  vm.TreatData = function (data) {
    var lista = [];
    angular.forEach(data, function (value) {
      if(value[1] != 'no/no-img.jpg') {
        lista.push({
          id: "",
          tipo: "sem-variacao",
          skuPai: "",
          sku: vm.GetSku(),
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
          categoriaNomeNivel1: "",
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
        });
      }
    });
    return lista;
  };

  vm.dtOptions = DTOptionsBuilder.fromFnPromise( function () {
    var defer = $q.defer();
    $http.get('/prices').then( function (result) {
      defer.resolve(vm.TreatData(result.data.data));
    });
    return defer.promise;
  })
    .withPaginationType('full_numbers')
    .withOption('loading', true)
    .withBootstrap()
    .withButtons([
      {
        extend: 'excel',
        text: 'Exportar para Excel',
        filename: 'lista-de-precos-' + moment().format('DD-MM-YYYY'),
        key: {
            key: 'e',
            altkey: true
        }
      }
    ])
    .withOption('responsive', true);

  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').withTitle('id').notVisible(),
    DTColumnBuilder.newColumn('tipo').withTitle('tipo'),
    DTColumnBuilder.newColumn('skuPai').withTitle('sku-pai').notVisible(),
    DTColumnBuilder.newColumn('sku').withTitle('sku'),
    DTColumnBuilder.newColumn('ativo').withTitle('ativo'),
    DTColumnBuilder.newColumn('usado').withTitle('usado').notVisible(),
    DTColumnBuilder.newColumn('ncm').withTitle('ncm').notVisible(),
    DTColumnBuilder.newColumn('gtin').withTitle('gtin').notVisible(),
    DTColumnBuilder.newColumn('nome').withTitle('nome'),
    DTColumnBuilder.newColumn('descricaoCompleta').withTitle('descricao-completa'),
    DTColumnBuilder.newColumn('urlVideoYoutube').withTitle('url-video-youtube').notVisible(),
    DTColumnBuilder.newColumn('estoqueGerenciado').withTitle('estoque-gerenciado').notVisible(),
    DTColumnBuilder.newColumn('estoqueQuantidade').withTitle('estoque-quantidade').notVisible(),
    DTColumnBuilder.newColumn('estoqueSituacaoEmEstoque').withTitle('estoque-situacao-em-estoque').notVisible(),
    DTColumnBuilder.newColumn('estoqueSituacaoSemEstoque').withTitle('estoque-situacao-sem-estoque').notVisible(),
    DTColumnBuilder.newColumn('precoSobConsulta').withTitle('preco-sob-consulta').notVisible(),
    DTColumnBuilder.newColumn('precoCusto').withTitle('preco-custo'),
    DTColumnBuilder.newColumn('precoCheio').withTitle('preco-cheio'),
    DTColumnBuilder.newColumn('precoPromocional').withTitle('preco-promocional'),
    DTColumnBuilder.newColumn('marca').withTitle('marca').notVisible(),
    DTColumnBuilder.newColumn('pesoEmKg').withTitle('peso-em-kg').notVisible(),
    DTColumnBuilder.newColumn('alturaEmCm').withTitle('altura-em-cm').notVisible(),
    DTColumnBuilder.newColumn('larguraEmCm').withTitle('largura-em-cm').notVisible(),
    DTColumnBuilder.newColumn('comprimentoEmCm').withTitle('comprimento-em-cm').notVisible(),
    DTColumnBuilder.newColumn('categoriaNomeNivel1').withTitle('categoria-nome-nivel-1').notVisible(),
    DTColumnBuilder.newColumn('categoriaNomeNivel2').withTitle('categoria-nome-nivel-2').notVisible(),
    DTColumnBuilder.newColumn('categoriaNomeNivel3').withTitle('categoria-nome-nivel3').notVisible(),
    DTColumnBuilder.newColumn('categoriaNomeNivel4').withTitle('categoria-nome-nivel4').notVisible(),
    DTColumnBuilder.newColumn('categoriaNomeNivel5').withTitle('categoria-nome-nivel5').notVisible(),
    DTColumnBuilder.newColumn('imagem1').withTitle('imagem-1'),
    DTColumnBuilder.newColumn('imagem2').withTitle('imagem-2').notVisible(),
    DTColumnBuilder.newColumn('imagem3').withTitle('imagem-3').notVisible(),
    DTColumnBuilder.newColumn('imagem4').withTitle('imagem-4').notVisible(),
    DTColumnBuilder.newColumn('imagem5').withTitle('imagem-5').notVisible(),
    DTColumnBuilder.newColumn('gradeGenero').withTitle('grade-genero').notVisible(),
    DTColumnBuilder.newColumn('gradeTamanhoDeAnelalianca').withTitle('grade-tamanho-de-anelalianca').notVisible(),
    DTColumnBuilder.newColumn('gradeTamanhoDeCalca').withTitle('grade-tamanho-de-calca').notVisible(),
    DTColumnBuilder.newColumn('gradeTamanhoDeCamisacamiseta').withTitle('grade-tamanho-de-camisacamiseta').notVisible(),
    DTColumnBuilder.newColumn('gradeTamanhoDeCapacete').withTitle('grade-tamanho-de-capacete').notVisible(),
    DTColumnBuilder.newColumn('gradeTamanhoDeTenis').withTitle('grade-tamanho-de-tenis').notVisible(),
    DTColumnBuilder.newColumn('gradeVoltagem').withTitle('grade-voltagem').notVisible(),
    DTColumnBuilder.newColumn('gradeTamanhoJuvenilInfantil').withTitle('grade-tamanho-juvenil-infantil').notVisible(),
    DTColumnBuilder.newColumn('gradeProdutoComUmaCor').withTitle('grade-produto-com-uma-cor').notVisible(),
    DTColumnBuilder.newColumn('gradeProdutoComDuasCores').withTitle('grade-produto-com-duas-cores').notVisible(),
    DTColumnBuilder.newColumn('urlAntiga').withTitle('url-antiga').notVisible(),
    DTColumnBuilder.newColumn('seoTagTitle').withTitle('seo-tag-title'),
    DTColumnBuilder.newColumn('seoTagDescription').withTitle('seo-tag-description').notVisible()
  ]



  vm.DownloadFile = function (tableId) {
    var exportHref = ExcelAPI.tableToExcel(tableId,'lista-de-precos.xlsx').then(
      function (res) {
        $window.location.href = res
      }
    )
  }
}

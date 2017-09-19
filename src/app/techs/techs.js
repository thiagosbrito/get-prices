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
  vm.GetPrices = function ($event) {
    $scope.contained_progressbar.start();
    var defer = $q.defer();
    $http.get(url).then(function(result) {
      angular.forEach(result.data.data, function (value) {
        value = {
          id: value[0],
          picture: value[1],
          name: value[2].replace(/<(?:.|\n)*?>/gm, ''),
          category: value[3],
          usvalue: value[4],
          // brvalue: value[5],
          price: parseFloat(value[4].replace('US$ ','').replace(',','.') * 5.69).toFixed(2),
          promotionalPrice: parseFloat(value[4].replace('US$ ','').replace(',','.') * 5.03).toFixed(2)
        };
        vm.priceList.push(value);
      })
      defer.resolve(vm.priceList)
    });
    $scope.contained_progressbar.complete();
    return defer.promise;
  };

  vm.dtOptions = DTOptionsBuilder.newOptions()
    .withPaginationType('full_numbers')
    .withDisplayLength(100)
    .withBootstrap()
    .withOption('processing', true)
    .withTableTools('vendor/datatables-tabletools/swf/copy_csv_xls_pdf.swf')
    .withTableToolsButtons([
        'copy',
        'print', {
            'sExtends': 'collection',
            'sButtonText': 'Save',
            'aButtons': ['csv', 'xls', 'pdf']
        }
    ])
    .withButtons([
    	  {
    		  extend:    'excel',
    		  text:      '<i class="fa fa-file-text-o"></i> Excel',
    		  titleAttr: 'Excel'
    	  }
      ]
    );

  vm.dtColumns = [
    DTColumnBuilder.newColumn('id').withTitle('Produto'),
    DTColumnBuilder.newColumn('picture').withTitle('Imagem'),
    DTColumnBuilder.newColumn('name').withTitle('Nome'),
    DTColumnBuilder.newColumn('category').withTitle('Categoria'),
    DTColumnBuilder.newColumn('usvalue').withTitle('Valor em US$'),
    // DTColumnBuilder.newColumn('brvalue').withTitle('Valor em R$'),
    DTColumnBuilder.newColumn('price').withTitle('Meu Preço'),
    DTColumnBuilder.newColumn('promotionalPrice').withTitle('Meu Preço Promocional')
  ];
  // vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
  //   var defer = $q.defer();
  //   $http.get(url).then(function(result) {
  //     angular.forEach(result.data.data, function (value) {
  //       value = {
  //         id: value[0],
  //         picture: value[1],
  //         name: value[2].replace(/<(?:.|\n)*?>/gm, ''),
  //         category: value[3],
  //         usvalue: value[4],
  //         brvalue: value[5]
  //       };
  //       vm.priceList.push(value);
  //     })
  //     console.log(vm.priceList);
  //     defer.resolve(vm.priceList)
  //   });
  //   return defer.promise;
  // })
  // .withPaginationType('full_numbers')
  // .withDisplayLength(10)
  // .withDOM('pitrfl')
  // .withBootstrap()
  // .withOption('processing', true);
  //
  // vm.dtColumns = [
  //   DTColumnBuilder.newColumn('id').withTitle('Produto ID'),
  //   DTColumnBuilder.newColumn('picture').withTitle('Imagem'),
  //   DTColumnBuilder.newColumn('name').withTitle('Nome'),
  //   DTColumnBuilder.newColumn('category').withTitle('Categoria'),
  //   DTColumnBuilder.newColumn('usvalue').withTitle('Valor em US$'),
  //   DTColumnBuilder.newColumn('brvalue').withTitle('Valor em R$')
  //   // DTColumnBuilder.newColumn('lastName').withTitle('Last name').notVisible()
  // ];

  vm.DownloadFile = function (tableId) {
    var exportHref = ExcelAPI.tableToExcel(tableId,'lista-de-precos.xlsx').then(
      function (res) {
        $window.location.href = res
      }
    )
  }
}

angular
  .module('app', [
    'ui.router',
    'ngProgress',
    'datatables',
    'datatables.bootstrap',
    'datatables.tabletools',
    'datatables.buttons',
    'ngJsonExportExcel'
  ])
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])

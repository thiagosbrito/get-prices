angular
  .module('app', [
    'ui.router',
    'ngProgress',
    'datatables',
    'datatables.bootstrap',
    'datatables.tabletools',
    'datatables.buttons'
  ])
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])

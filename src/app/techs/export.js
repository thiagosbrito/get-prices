(function () {
  'use strict';
  angular.module('app')
    .factory('ExcelAPI', Excel);

    Excel.$inject = ['$window','$q'];

    function Excel ($window, $q) {

      var uri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    		  template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'+
                        '<head>'+
                          '<!--[if gte mso 9]>'+
                          '<xml>'+
                            '<x:ExcelWorkbook>'+
                              '<x:ExcelWorksheets>'+
                                '<x:ExcelWorksheet>'+
                                  '<x:Name>{worksheet}</x:Name>'+
                                  '<x:WorksheetOptions>'+
                                    '<x:DisplayGridlines/>'+
                                    '</x:WorksheetOptions>'+
                                '</x:ExcelWorksheet>'+
                              '</x:ExcelWorksheets>'+
                            '</x:ExcelWorkbook>'+
                          '</xml>'+
                          '<![endif]-->'+
                        '</head>'+
                        '<body>'+
                          '<table>{table}</table>'+
                        '</body>'+
                      '</html>',
      		base64 = function (s) {
            return $window.btoa(unescape(encodeURIComponent(s)));
          },
      		format = function(s,c) {
            return s.replace(/{(\w+)}/g, function (m,p) {return c[p];})
          };

      this.tableToExcel = function(tableId, worksheetName){
        var defer = $q.defer();
  			var table = $(tableId),
  				  ctx = { worksheet: worksheetName, table:table.html() },
  				  href = uri + base64(format(template,ctx));
            defer.resolve(href);
		    return defer.promise;
  		}

      return this;

    }
})();

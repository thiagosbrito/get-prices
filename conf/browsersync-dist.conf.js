const conf = require('./gulp.conf');
var proxy = require('http-proxy-middleware');

var jsonPlaceholderProxy = proxy('/prices', {
  target: 'http://www.pioneerinter.com/lista-de-precos/get?q=',
  changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
  logLevel: 'debug'
});

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.dist
      ],
      middleware: [jsonPlaceholderProxy],
    },
    open: false
  };
};

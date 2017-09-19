var gzippo = require('gzippo');
var express = require('express');
var app = express();
var morgan = require('morgan');
var logger = morgan('combined');
var fs = require('fs');
var proxy = require('http-proxy-middleware');

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

app.use(morgan('combinedstream',accessLogStream));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use('/prices', proxy({target: 'http://www.pioneerinter.com/lista-de-precos/get?q=', changeOrigin: true}));
app.listen(process.argv[2]);

console.log('Server running at http://127.0.0.1:' + process.argv[2]);

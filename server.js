var express = require('express');
var app = express();

app.use(express.static('public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world!!');
});
app.get('/', function(req, res){
    res.redirect('./assignment/home.html');
});

app.listen(port, ipaddress);
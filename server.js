var express = require('express');
var app = express();

app.get('/', function(req,res){
	res.send('Hello Express!');
});

app.get('/hosts',function(req,res){
	res.send('These are the hosts');
});
app.listen(3000);
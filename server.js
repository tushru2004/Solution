var express = require('express');
var app = express();
var network = require("./graph.js");
var PORT = process.env.PORT || 3000;

app.get('/', function(req,res){
	res.send('Hello Express!');
});

app.get('/host',function(req,res){
	res.send('These are the hosts');
});
app.listen(PORT,function(){
	console.log('Express started on port '+ PORT + '!');
});
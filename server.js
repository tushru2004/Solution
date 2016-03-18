var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var network = require("./network/graph.js");
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

//Create a host in the network
app.post('/host',function(req,res){
	var node = _.pick(req.body, 'name');
	network.addNode(node);
	res.status(200).json("Node successfully created");
});

//Create a link in the network
app.post('/link',function(req,res){
	
	var reqnames = _.pick(req.body, 'names');
	var reqdesc = _.pick(req.body, 'description');
	var nodes = reqnames["names"];
	
	// Do error checking 
	if(_.isEmpty(reqnames) || _.isEmpty(reqdesc) || nodes.length !=2){
		res.status(400).send("Link should contain only two node names and a link description.For ex \{\"names\" : [\"A\",\"B\"],\"description\" : \"scp\"\}");
		return;
	}
	//Check if nodes exist in the network
	for(var i=0,len= nodes.length; i<len;i++){
		if(!network.checkexists(nodes[i])){
			res.status(400).send("Host " + nodes[i] + " does not exist in the network.Please add the host in the network before adding a link");
			return ;
		}
	}
	
	//Create a link
	var link={};
	link["names"]= reqnames["names"];
	link["description"] = reqdesc["description"];
	//Add link to network
	var result= network.addLink(link);
	res.status(200).send("Link created successfully");
});

//Get all links in the network
app.get('/links',function(req,res){
	res.status(200).json(network.getAllLinks());
});


//Get all hosts
app.get('/hosts',function(req,res){
	res.status(200).json(network.getAllNodes())
});

//Get the shortest path between two nodes
app.get('/path/:A/to/:B',function(req,res){
	var source= req.params.A;
	var destination = req.params.B;
	//Check if source exists in the network
	if(!network.checkexists(source)){
		var emptyarr=[];
		res.status(400).send("Host "+source +" does not exist in network");
		return; 
	}
	//Check if destination exists in the network
	if(!network.checkexists(destination)){
		var emptyarr=[];
		res.status(400).send("Host"+ destination+" does not exist in network");
		return; 
	}
	//Get shortest path
	var path= network.getPath(source,destination);
	res.status(200).json(path);
});

app.listen(PORT,function(){
	console.log('Express started on port '+ PORT + '!');
});

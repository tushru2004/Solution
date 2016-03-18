var bfspath = require('./shortestpath.js');
var _=require('underscore');

var network = (function(){
	var networkinstance;

	function createnetwork(){
		//List of all nodes
		var nodelist=[];
		//Adjacency list for graph
		var adjlist={};

		var addNode = function(newnode){
			nodelist.push(newnode);
		}
		//Check if node exists
		var checkexists = function(nodename){
			var y = _.some(nodelist, function(node) {
    			return node["name"] === nodename; 
			});
    		return y;
		}
		//Add link to network
		var addLink = function(link){
			 
			var source = link.names[0];
			var dest = link.names[1];
			var description = link.description;
			//Add link from source to dest 
			addtoNetwork(source,dest,description);
			//Add link from dest to source 
			addtoNetwork(dest,source,description);
			
			return adjlist;
		}
		//Return all links
		var getalllinks = function(){
			return adjlist;
		}
		//Return all nodes
		var getallnodes = function(){
			return nodelist;
		}
		//(Private utility)Add link to network
		var addtoNetwork = function(source,destination,description){
			var destinfo= {};
			destinfo["name"] = destination;
			destinfo["description"] = description;
			if(adjlist[source])
			{
				var collection = adjlist[source];
				collection.push(destinfo);
				adjlist[source] = collection;
			}else{

				var newcollection =[];
				newcollection.push(destinfo);
				adjlist[source] = newcollection;
			}
			return adjlist;
		}
		//Get shortest path from source to destination
		var getpath = function(source,destination){
			return bfspath.computesp(adjlist,source,destination);
		}

		return {
			addNode : addNode,
			addLink : addLink,
			getPath : getpath,
			checkexists : checkexists,
			getAllLinks : getalllinks,
			getAllNodes : getallnodes
		};
	}

	return {
			getInstance : function(){
				if(!networkinstance){
					networkinstance = createnetwork();
				}
				return networkinstance;
			}
		};
	

})();

module.exports = network.getInstance();
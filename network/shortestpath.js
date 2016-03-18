var _ = require("underscore");

var pathComputation = function(adjList,srcname,destname){
	var visited = [];
	var queue =[];
	var emptyarr=[];
	var bfsinfo = {};
	bfsinfo["node"] = srcname;
	bfsinfo["path"] = [];
	queue.push(bfsinfo);
	//Remember visited nodes
	visited.push(bfsinfo);

	while(queue.length>0){
		var poppedelem=	queue.shift();
		var src =poppedelem["node"];

		var neighborcoll = adjList[src]; //B --> {E , http}
		if(!neighborcoll) return emptyarr;
	
		var parentpath = poppedelem["path"];
		for(var i=0,len = neighborcoll.length;i < len;i++){

			var neighbor = neighborcoll[i];
			//Visit neighboring node if it is not visited 
			if(!isvisited(visited,neighbor["name"])){
				
				var newbfsinfo ={};
				var dest = neighbor["name"];
				newbfsinfo["node"]= dest;
				//Create a clone of where you are coming from
				newbfsinfo["path"]= poppedelem["path"].slice(0);
				//Remember the path
				newbfsinfo["path"].push(src +" "+ neighbor["description"] + " "+ dest); 
				visited.push(newbfsinfo);
				queue.push(newbfsinfo);

				//Check if the destination node has been found
				if(neighbor["name"] === destname){
					return newbfsinfo["path"];
				}
			}

		}
		
	}
	return emptyarr;

	function isvisited(coll,value){
		var y = _.some(coll, function(c) {
    		return c["node"] === value; 
		});
    	return y;
	}
}

var bfs = {};
bfs.computesp= pathComputation;

module.exports = bfs;
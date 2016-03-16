var graph = function(){
	var nodelist= [];

}

graph.prototype={

	addNode:function(newnode){
		nodelist.push(newnode);
	},
	printNodes:function(){

		for(var i=0, len =nodelist.length; i< len;i++){
			console.log(nodelist[i]);
		}

	}
}

module.exports = graph;
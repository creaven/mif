/*
Mif.Tree.Sort
*/
Mif.Tree.implement({
	
	initSortable: function(sortFunction){
		var tree=this;
		this.sortable=true;
		this.sortFunction=sortFunction||function(node1, node2){
			if(node1.property.name>node2.property.name){
				return 1;
			}else if(node1.property.name<node2.property.name){
				return -1;
			}else{
				return 0;
			}
		};
		this.addEvent('load', function(node){
			if(!node) node=tree.root;
			node.recursive(function(){
				this.sort();
			});
		});
		this.addEvent('structureChange', function(from, to, where, type){
			from.sort();
		});
		return this;
	}
	
});


Mif.Tree.Node.implement({

	sort: function(sortFunction){
		this.children.sort(sortFunction||this.tree.sortFunction);
		return this;
	}
	
});

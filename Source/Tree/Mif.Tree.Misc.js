Mif.Tree.implement({

	expandTo: function(node){
		if (!node) return this;
		while( !node.isRoot() && !(this.forest && node.getParent().isRoot()) ){
			node=node.getParent();
			if(!node) break;
			node.toggle(true);
		};
		return this;
	},

	initExpandTo: function(){
		this.addEvent('load', function(node){
			var tree=this;
			if(!node) node=tree.root;
			node.recursive(function(){
				if(this.property.expandTo){
					tree.expandTo(this);
				};
			});
		});
	}
	
});

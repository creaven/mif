Mif.Tree.implement({

	expandTo: function(node){
		if (!node) return this;
		var path = [];
		while( !node.isRoot() && !(this.forest && node.getParent().isRoot()) ){
			node=node.getParent();
			if(!node) break;
			path.unshift(node);
		};
		path.each(function(el){
			el.toggle(true)
		});
		return this;
	},

	initExpandTo: function(){
		this.addEvent('loadChildren', function(parent){
			if(!parent) return;
			var children=parent.children;
			for( var i=children.length; i--; ){
				var child=children[i];
				if(child.property.expandTo) this.expanded.push(child);
			}
		});
		function expand(){
			this.expanded.each(function(node){
				this.expandTo(node);
			}, this);
			this.expanded=[];
		};
		this.addEvents({
			'load': expand.bind(this),
			'loadNode': expand.bind(this)
		});
	}
	
});

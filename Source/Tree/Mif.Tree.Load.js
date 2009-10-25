/*
Mif.Tree.Load
*/
Mif.Tree.Load={
		
	children: function(children, parent, tree){
		for( var i=children.length; i--; ){
			var child=children[i];
			var subChildren=child.children;
			var node=new Mif.Tree.Node({
				tree: tree,
				parentNode: parent||undefined
			}, child);
			if( tree.forest || parent != undefined){
				parent.children.unshift(node);
			}else{
				tree.root=node;
			}
			if(subChildren && subChildren.length){
				arguments.callee(subChildren, node, tree);
			}
		}
		if(parent) parent.property.loaded=true;
		tree.fireEvent('loadChildren', parent);
	}
	
};

Mif.Tree.implement({

	load: function(options){
		var tree=this;
		if($type(options)=='array'){
			options={
				json: options
			}
		}
		if($type(options)=='string'){
			options={
				url: options
			}
		}
		this.loadOptions=this.loadOptions||$lambda({});
		function success(json){
			if(tree.forest){
				tree.root=new Mif.Tree.Node({
					tree: tree,
					parentNode: null
				}, {});
				var parent=tree.root;
			}else{
				var parent=null;
			}
			Mif.Tree.Load.children(json, parent, tree);
			Mif.Tree.Draw[tree.forest ? 'forestRoot' : 'root'](tree);
			tree.$getIndex();
			tree.fireEvent('load');
			return tree;
		}
		options=$extend($extend({
			isSuccess: $lambda(true),
			secure: true,
			onSuccess: success,
			method: 'get'
		}, this.loadOptions()), options);
		if(options.json) return success(options.json);
		new Request.JSON(options).send();
		return this;
	}
	
});

Mif.Tree.Node.implement({
	
	load: function(options){
		this.$loading=true;
		if($type(options)=='array'){
			options={
				json: options
			}
		}
		if($type(options)=='string'){
			options={
				url: options
			}
		}
		options=options||{};
		var type=this.get('type');
		this.set('type', 'loader');
		var self=this;
		function success(json){
			Mif.Tree.Load.children(json, self, self.tree);
			delete self.$loading;
			self.property.loaded=true;
			self.set('type', type);
			Mif.Tree.Draw.update(self);
			self.fireEvent('load');
			self.tree.fireEvent('loadNode', self);
			return self;
		}
		options=$extend($extend($extend({
			isSuccess: $lambda(true),
			secure: true,
			onSuccess: success,
			method: 'get'
		}, this.tree.loadOptions(this)), this.property.loadOptions), options);
		if(options.json) return success(options.json);
		new Request.JSON(options).send();
		return this;
	}
	
});

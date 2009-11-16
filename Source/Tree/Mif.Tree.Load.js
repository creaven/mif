/*
Mif.Tree.Load
*/

Mif.sheet.addRules({
	
	'tree .loader-icon': {
		'background-image': 'loader.gif'.toMifImg()
	}
	
});

Mif.Tree.implement({

	load: function(options){
		var loader=this.loader;
		loader.load(this, options);
		return this;
	}
	
});

Mif.Tree.Node.implement({
	
	load: function(options){
		var loader=this.loader||this.tree.loader;
		loader.load(this, options);
		return this;
	}
	
});


Mif.Tree.Loader=new Class({
	
	Implements: [Events],
	
	initialize: function(options){
		this.options=options;
		this.defaultOptions={
			isSuccess: $lambda(true),
			secure: true,
			onSuccess: this.onSuccess,
			method: 'get'
		};
	},
	
	toOptions: function(options){
		if(!options) return {};
		if($type(options)=='array'){
			options={loadData: options};
		}
		if($type(options)=='string'){
			options={url: options};
		}
		return options;	
	},
	
	load: function(item, options){
		options=this.toOptions(options);
		var defaultOptions=$unlink(this.defaultOptions);
		var localOptions={};
		var globalOptions=this.toOptions($lambda(this.options)(item));
		if(item instanceof Mif.Tree.Node){
			localOptions=this.toOptions($lambda(item.property.loaderOptions)(item));
		}
		options=$extend($extend($extend(defaultOptions, globalOptions), localOptions), options);
		var node, tree;
		if(item instanceof Mif.Tree.Node){//node
			node=item;
			tree=node.tree;
		}else{
			tree=item;
		}
		if(item instanceof Mif.Tree.Node){
			item.getElement('icon').addClass('loader-icon');
		}
		var struct={node: node, tree: tree};
		options.loadData=options.loadData||options.json;
		if(options.loadData){
			return this.loadData(options.loadData, struct);
		}
		var request = new Request.JSON(options);
		request.struct=struct;
		request.loader=this;
		request.send();
	},
	
	onSuccess: function(data){
		this.loader.loadData(data, this.struct);
	},
	
	/*onError: function(){
		
	},*/
	
	loadData: function(data, struct){
		var node=struct.node;
		var tree=struct.tree;
		if(!node && tree.forest){
			tree.root=new Mif.Tree.Node({
				tree: tree,
				parentNode: null
			});
			struct.node=tree.root;
		}
		this.dataToObj(data, struct);
		if(node){
			delete node.$loading;
			node.fireEvent('load');
			tree.fireEvent('load', node);
			Mif.Tree.Draw.update(node);
		}else{
			Mif.Tree.Draw[tree.forest ? 'forestRoot' : 'root'](tree);
			tree.$getIndex();
			tree.fireEvent('load');
		}
	},
	
	dataToObj: function(data, struct){
		var parent=struct.node;
		var tree=struct.tree;
		var children=data;
		for( var i=children.length; i--; ){
			var child=children[i];
			var subChildren=child.children;
			var node=new Mif.Tree.Node({
				tree: tree,
				parentNode: parent
			}, child);
			if( tree.forest || parent != undefined){
				parent.children.unshift(node);
			}else{
				tree.root=node;
			}
			if(subChildren && subChildren.length){
				arguments.callee(subChildren, {node: node, tree: tree});
			}
		}
		if(parent) parent.property.loaded=true;
	}
	
});

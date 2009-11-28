Mif.Tree.Item.implement({
		
	getPath: function(){
		var path=[];
		var node=this;
		while(node){
			path.push(node.get('name'));
			node=node.getParent();
		}
		return path.reverse().join('/');
	}

});

var tree = new Mif.Tree({
	container: $('tree_container'),
	initialize: function(){
		this.initSortable();
		this.addEvent('nodeCreate', function(node){
			node.set({
				property:{
					id:	node.getPath()
				}
			});
		});
		var storage=new Mif.Tree.CookieStorage(this);
		this.addEvent('load', function(){
			storage.restore();
		}).addEvent('loadChildren', function(parent){
			storage.restore();
		});
	},
	types: {
		folder:{
			openIcon: 'mif-tree-open-icon',
			closeIcon: 'mif-tree-close-icon',
			loadable: true
		},
		file:{
			openIcon: 'mif-tree-file-open-icon',
			closeIcon: 'mif-tree-file-close-icon'
		}
	},
	dfltType:'folder'
});

tree.load({
	url: demo_path+'getRoot.php'
});

tree.loader.options=function(node){
	return {
		url: demo_path+'getChildren.php',
		data: {'abs_path': node.get('abs_path')}
	};
};
window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container')
	})
	.load({
		url: 'Tree/files/simpleTree.json'
	})
	.addEvent('load', function(){
		this.root.recursive(function(){
			this.toggle();
		});
		this.select(this.root);
	});
	
	
	$('rename').addEvent('click', function(){
		var node=tree.getSelected();
	    if(!node) return;
	    node.rename();
	});
	
	
	$('remove').addEvent('click', function(){
		var node=tree.getSelected();
	    if(!node) return;
	    node.remove();
	});	


	$('protect').addEvent('click', function(){
		var node=tree.getSelected();
	    if(!node) return;
	    node.set({
			renameDenied: node.property.renameDenied ? false : true, 
			removeDenied: node.property.removeDenied ? false : true,
			name: node.property.renameDenied ? node.property.name.replace(/ protected/, '') : node.property.name+' protected'
		});
	});	
		
});
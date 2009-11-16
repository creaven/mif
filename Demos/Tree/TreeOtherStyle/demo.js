window.addEvent('domready',function(){
	SimpleTree = new Mif.Tree({
		container: $('tree_container')
	})
	.addEvent('load', function(){
		this.root.recursive(function(){
			this.toggle();
		});
		this.select(this.root).focus();
	})
	.load({
		url: 'Tree/files/simpleTree.json'
	});
});
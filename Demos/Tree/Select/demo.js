window.addEvent('domready',function(){
	SimpleTree = new Mif.Tree({
		container: $('tree_container'),
		data: 'Tree/files/simpleTree.json',
		height: 18
	})
	.addEvent('load', function(){
		this.root.recursive(function(){
			this.toggle();
		});
	})
	.addEvent('select',function(node){
		$('log').adopt(new Element('li').set('html', node.get('name')+' selected'));
	})
	.addEvent('unSelect', function(node){
		$('log').adopt(new Element('li').set('html', node.get('name')+' unselected'));
	});
});
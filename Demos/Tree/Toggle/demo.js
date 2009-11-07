window.addEvent('domready',function(){
	SimpleTree = new Mif.Tree({
		container: $('tree_container'),
		data: 'Tree/files/simpleTree.json'
	})
	.addEvent('toggle',function(node, state){
		$('log').adopt(new Element('li').set('html', node.get('name')+' '+(state ? 'expanded' : 'collapsed')));
	});
});
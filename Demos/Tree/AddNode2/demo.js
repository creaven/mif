window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container')
	})
	.addEvent('load', function(){
		var root=this.root;
		var newNode=new Mif.Tree.Item({name: 'node1'}, {
            parentItem: root,
            owner: tree
            });
        tree.add(newNode, root, 'inside');

        var newNode2=new Mif.Tree.Item({name: 'node1.1'}, {
            parentItem: newNode,
            owner: tree
            });
        tree.add(newNode2, newNode, 'inside');
	});
	tree.load([{name: 'root'}])
	
});
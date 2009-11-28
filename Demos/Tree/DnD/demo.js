window.addEvent('domready',function(){
	
	var loader = new Mif.Tree.Loader(function(node){
		// if node name 'empty' load from url 'empty.json'
		if(!(node instanceof Mif.Tree.Item)) return {};
		return node.get('name')=='empty' ? 'Tree/files/empty.json' : 'Tree/files/mediumTree.json';
	});
	
	var tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		loader: loader,
		initialize: function(){
			new Mif.Tree.Drag(this, {
				droppables: [
					new Mif.Tree.Drag.Element('drop_container',{
						onDrop: function(node){
							$('drop').adopt(new Element('li',{html: node.get('name')}));
						}
					})
				],
				onDrop: function(current, target, where){
					//console.log(current, target, where);
				}
			});
		},
		types: {
			folder:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon'
			},
			loader:{
				openIcon: 'mif-tree-loader-open-icon',
				closeIcon: 'mif-tree-loader-close-icon',
				dropDenied: ['inside','after']
			},
			disabled:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon',
				dragDisabled: true,
				cls: 'disabled'
			},
			book:{
				openIcon: 'mif-tree-book-icon-open',
				closeIcon: 'mif-tree-book-icon',
				loadable: true
			},
			books:{
				openIcon: 'mif-tree-books-icon',
				closeIcon: 'mif-tree-books-icon'
			},
			smiley:{
				openIcon: 'mif-tree-smiley-open-icon',
				closeIcon: 'mif-tree-smiley-close-icon'
			}
		},
		dfltType:'folder',
		onCopy: function(from, to, where, copy){
			if(from.getParent()==copy.getParent()){
				copy.set({
					name: 'copy '+from.get('name')
				});
			}
		}
	});

	//tree.initSortable();
	tree.load({
		url: 'Tree/files/forest.json'
	});
	
	var tree2 = new Mif.Tree({
		container: $('tree_container2'),
		forest: true,
		loader: loader,
		initialize: function(){
			new Mif.Tree.Drag(this);
		},
		types: {
			dflt:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon'
			},
			loader:{
				openIcon: 'mif-tree-loader-open-icon',
				closeIcon: 'mif-tree-loader-close-icon',
				dropDenied: ['inside','after']
			},
			disabled:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon',
				dragDisbled: true,
				cls: 'disabled'
			},
			book:{
				openIcon: 'mif-tree-book-icon-open',
				closeIcon: 'mif-tree-book-icon',
				loadable: true
			},
			books:{
				openIcon: 'mif-tree-books-icon',
				closeIcon: 'mif-tree-books-icon'
			},
			smiley:{
				openIcon: 'mif-tree-smiley-open-icon',
				closeIcon: 'mif-tree-smiley-close-icon'
			}
		},
		onCopy: function(from, to, where, copy){
			if(from.getParent()==copy.getParent()){
				copy.set({
					name: 'copy '+from.get('name')
				});
			}
		}
	});

	var json=[	
		{
			"name": "root",
			"children": [
				{
					"name": "node1"
				},
				{
					"name": "node2",
					"children":[
						{
							"name": "node2.1"
						},
						{
							"name": "node2.2"
						}
					]
				},
				{
					"name": "node4"
				},
				{
					"name": "node3"
				}
			]
		}
	];
	tree2.load(json);
});
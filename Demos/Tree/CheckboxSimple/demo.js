window.addEvent('domready',function(){
	var tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			this.initCheckbox('simple');
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
				dragDisabled: true,
				cls: 'disabled'
			},
			book:{
				openIcon: 'mif-tree-book-icon-open',
				closeIcon: 'mif-tree-book-icon',
				loadable: true
			},
			smiley:{
				openIcon: 'mif-tree-smiley-open-icon',
				closeIcon: 'mif-tree-smiley-close-icon'
			}
		},
		onCheck: function(node){
			$('log').adopt(new Element('li').set('html', node.get('name')+' checked'));
		},
		onUnCheck: function(node){
			$('log').adopt(new Element('li').set('html', node.get('name')+' unchecked'));
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
					"hasCheckbox": false,
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
					"name": "node3",
					hasCheckbox: false
				}
			]
		}
	];
	
	// load tree from json.
	tree.load(json);
});
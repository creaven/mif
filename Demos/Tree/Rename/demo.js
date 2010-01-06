window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		onRename: function(node, newName, oldName){
			alert(oldName+' renamed to '+newName);
		}
	});

	var json=[	
		{
			"name": "root",
			"children": [
				{
					"name": "node1",
					"a": {p: 'moo'}
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
					"name": "node3"
				},
				{
					"name": "node4"
				}
			]
		}
	];
	
	// load tree from json.
	tree.load(json);
	
	$('rename').addEvent('click', function(){
		var node=tree.getSelected();
	    if(!node) return;
	    node.rename();
	});
	
	tree.options.beforeRename=function(node, oldName, newName){
		if(confirm('complete rename?')){
			this.renameComplete();
		}else{
			this.renameCancel();
		}
	};
	
});
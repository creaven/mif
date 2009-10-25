window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		height: 18//node height
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
					"hidden": true,
					"open": true,
					"children": [
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
	tree.load({
		json: json
	});
	
	
	$('hide').addEvent('click', function(){
		var selected=tree.getSelected();
		if(selected){
			selected.set({hidden: true});
		}
	});
	
	$('show').addEvent('click', function(){
		tree.root.recursive(function(){
			this.set({hidden: false});
		});
	});
	
});
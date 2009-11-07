window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		types: {// node types
			green: {
				cls: 'green'
			}
		}
	});

	var json=[
		{
			"name": "root set green type",
			"children": [
				{
					"name": "node1"
				},
				{
					"name": "node2",
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
					"name": "node4"
				},
				{
					"name": "node3"
				}
			]
		}
	];
	
	tree.addEvent('load', function(){
		this.root.set({type: 'green'});
	});
	// load tree from json.
	tree.load(json);
	
});
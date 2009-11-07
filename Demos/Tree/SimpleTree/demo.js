window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container')// tree container
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
					"open": true,
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
	// load tree from json.
	tree.load(json);
	
});
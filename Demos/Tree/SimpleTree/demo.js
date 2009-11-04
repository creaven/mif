window.addEvent('domready',function(){
	var tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		height: 18//node height TODO it's ugly, should be removed
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
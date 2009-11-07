window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container')// tree container
	});

	var json=[
		{
			"name": "root",
			"open": true,
			"children": [
				{	
					"name": "node1"
				},
				{
					"name": "node2",
					"openIconUrl": "Tree/IconUrl/folder-open.gif",
					"closeIconUrl": "Tree/IconUrl/folder-close.gif",
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
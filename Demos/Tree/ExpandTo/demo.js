window.addEvent('domready',function(){
	tree = new Mif.Tree({
		initialize: function(){
			new Mif.Tree.KeyNav(this);
		},
		container: $('tree_container'),// tree container
		forest: true
	});
	
	var jsonChildren=[
		{
			"name": "nodeA"
		},
		{
			"name": "nodeB",
			"children": [
				{
					"name": "nodeB.1"
				},
				{
					"name": "nodeB.2",
					"expandTo": true,//expandTo - ugly, should be refactored
					"children":[
						{
							"name": "nodeB.2.1"
						}
					]
				},
				{
					"name": "nodeB.3"
				}
			]
		},
		{
			"name": "nodeC"
		}
	];

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
							"name": "node2.2",
							"expandTo": true,
							"children": [
								{
									"name": "node2.2.1"
								},
								{
									"name": "node2.2.2"
								},
								{
									"name": "node2.2.3",
									"loadOptions": {"json": jsonChildren},
									"loadable": true
								}
							]
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
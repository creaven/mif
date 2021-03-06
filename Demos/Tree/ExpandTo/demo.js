window.addEvent('domready',function(){
	var tree = new Mif.Tree({
		initialize: function(){
			this.initExpandTo();
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
					"expandTo": true,
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
									"loaderOptions": {"json": jsonChildren},
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
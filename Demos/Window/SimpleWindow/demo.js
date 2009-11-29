window.addEvent('domready', function(){
	var mifWindow=new Mif.Window({
		title: 'Mif Window'
	});
	
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
	
	tree.inject(mifWindow.getElement('content'));
	
});

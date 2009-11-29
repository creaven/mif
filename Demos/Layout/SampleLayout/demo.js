window.addEvent('domready', function(){
	
	var layout=new Mif.Layout().inject(document.body);
	window.addEvent('resize', function(){
		document.getElement('layout').dispose().inject(document.getElement('body'))
	});
	
	tree = new Mif.Tree({
		//container: layout.center// tree container
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
	
	tree.inject(layout.left)
	
});
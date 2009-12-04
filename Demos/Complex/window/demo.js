window.addEvent('domready', function(){
	var mifWindow=new Mif.Window({
		title: 'Mif Window'
	});
	
	tree = new Mif.Tree();

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
	
	//tree.inject(mifWindow);
	
	SampleTabs=new Mif.Tabs().inject(mifWindow);
	new Mif.Tabs.Drag(SampleTabs);
	SampleTabs.load([
		{
			title: 'tab1',
			content: tree
		},
		{
			title: 'tab2',
			content: 'second  tab content'
		},
		{
			title: 'tab3',
			content: 'third tab content',
			disabled: true
		}
	]);
	
});

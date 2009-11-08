window.addEvent('domready',function(){
	var icons={
		uid: 0
	};
	var tree = new Mif.Tree({
		container: $('tree_container'),
		onNodeCreate: function(node){
			['open', 'close'].each(function(prop){
				var p=node.property[prop+'IconUrl']
				if(p){
					if(!icons[p]){
						var cls='icon-'+(++icons.uid);
						icons[p]=cls;
						Mif.sheet.addRule('.'+cls, 'background-image: url('+p+')');
					}
					node.property[prop+'Icon']=cls;
				}
			});
		}
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
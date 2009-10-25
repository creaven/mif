window.addEvent('domready',function(){

	Mif.Tree.Node.implement({
	
		switchSelect: function(state){
			this.tree[state ? 'select' : 'unselect'](this);
		}
		
	});

	tree = new Mif.Tree({
		container: $('tree_container'),// tree container
		initialize: function(){
			this.initCheckbox('simple');
			var storage=new Mif.Tree.CookieStorage(this);
			var switchStorage=new Mif.Tree.CookieStorage(this, {event: 'switch', action: 'switch'});
			var selectStorage=new Mif.Tree.CookieStorage(this, {event: 'selectChange', action: 'switchSelect'});
			this.addEvent('load', function(){
				storage.restore();
				switchStorage.restore();
				selectStorage.restore();
			}).addEvent('loadChildren', function(){
				storage.restore();
				switchStorage.restore();
				selectStorage.restore();
			});
		},
		types: {// node types
			folder:{
				openIcon: 'mif-tree-open-icon',//css class open icon
				closeIcon: 'mif-tree-close-icon'// css class close icon
			}
		},
		dfltType:'folder',//default node type
		height: 18//node height
	});
	
	var children=[
		{
			"name": "cnode1",
			"id": "cnode1"
		},
		{
			"name": "cnode2",
			"id": "cnode2",
			"children":	[
				{
					"name": "cnodeX",
					"id": "cnodeXXXX"
				},
				{
					"name": "cnodeY",
					"id": "cnodeY",
					"children":[
						{
							"name": "cnodeZ",
							"id": "cnodeZ"
						},
						{
							"name": "cnodeL",
							"id": "cnodeL"
						}
					]
				}
			]
		},
		{
			"name": "cnode3",
			"id": "cnode3"
		}
	];

	var json=[
		{
			"name": "root",
			"id": "root",
			"children": [
				{
					"name": "node1",
					"id": "node1"
				},
				{
					"name": "node2",
					"id": "node2",
					"children":[
						{
							"name": "node2.1",
							"id": "node2.1"
						},
						{
							"name": "node2.2",
							"id": "node2.2",
							"children":[
								{
									"name": "node2.2.1",
									"id": "node2.2.1"
								},
								{
									"name": "node2.2.2",
									"id": "node2.2.2"
								}
							]
						}
					]
				},
				{
					"name": "node4",
					"id": "node4",
					"children":	[
						{
							"name": "nodeX",
							"id": "nodeXXXX"
						},
						{
							"name": "nodeY",
							"id": "nodeY"
						}
					]
				},
				{
					"name": "node3 loadable",
					"id": "node3",
					"loadable": true,
					"loadOptions": children
				}
			]
		}
	];
	
	// load tree from json.
	tree.load(json);
	
});
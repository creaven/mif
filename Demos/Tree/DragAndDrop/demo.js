window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			new Mif.Tree.Drag(this, {
				onDrag: function(){
					//inject book inside book not allowed;
					if(this.target && this.target.type=='book' && this.current.type=='book' && this.where=='inside'){
						this.where='notAllowed';
					}
					$('destination').innerHTML=this.target ? this.target.get('name') : '';
					$('where').innerHTML=this.where;
				},
				onStart: function(){
					$('source').innerHTML=this.current.get('name');
				},
				onComplete: function(){
					$('destination').innerHTML='';
					$('where').innerHTML='';
					$('source').innerHTML='';
				}
			});
		},
		types: {
			folder:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon'
			},
			loader:{
				openIcon: 'mif-tree-loader-open-icon',
				closeIcon: 'mif-tree-loader-close-icon',
				dropDenied: ['inside','after']
			},
			disabled:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon',
				dragDisabled: true,
				cls: 'disabled'
			},
			book:{
				openIcon: 'mif-tree-book-icon',
				closeIcon: 'mif-tree-book-icon',
				loadable: true
			},
			bin:{
				openIcon: 'mif-tree-bin-open-icon',
				closeIcon: 'mif-tree-bin-close-icon'
			}
		},
		dfltType:'folder',
		onCopy: function(from, to, where, copy){
			if(from.getParent()==copy.getParent()){
				copy.set({
					name: 'copy '+from.get('name')
				});
			}
		}
	});


	tree.load('Tree/files/forest.json');

	tree.loader.options=function(node){
		return node.get('name')=='empty' ? 'Tree/files/empty.json' : 'Tree/files/mediumTree.json';
	}
	
	tree2 = new Mif.Tree({
		container: $('tree_container2'),
		initialize: function(){
			new Mif.Tree.Drag(this, {
				onDrag: function(){
					$('destination').innerHTML=this.target ? this.target.get('name') : '';
					$('where').innerHTML=this.where;
				},
				onStart: function(){
					$('source').innerHTML=this.current.get('name');
				},
				onComplete: function(){
					$('destination').innerHTML='';
					$('where').innerHTML='';
					$('source').innerHTML='';
				}
			});
		},
		types: {
			folder:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon'
			},
			loader:{
				openIcon: 'mif-tree-loader-open-icon',
				closeIcon: 'mif-tree-loader-close-icon',
				dropDenied: ['inside','after']
			},
			disabled:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon',
				dragDisbled: true,
				cls: 'disabled'
			},
			book:{
				openIcon: 'mif-tree-book-icon',
				closeIcon: 'mif-tree-book-icon',
				loadable: true
			},
			bin:{
				openIcon: 'mif-tree-bin-open-icon',
				closeIcon: 'mif-tree-bin-close-icon'
			}
		},
		dfltType:'folder',
		onCopy: function(from, to, where, copy){
			if(from.getParent()==copy.getParent()){
				copy.set({
					name: 'copy '+from.get('name')
				});
			}
		}
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
	
	tree2.load({
		json: json
	});
	
});
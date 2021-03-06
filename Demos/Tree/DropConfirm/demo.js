window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			new Mif.Tree.Drag(this, {
				beforeDrop: function(current, target, where){
					if(!confirm('drop node?')){
						return false;
					}
					return true;
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
				openIcon: 'mif-tree-book-icon-open',
				closeIcon: 'mif-tree-book-icon',
				loadable: true
			},
			smiley:{
				openIcon: 'mif-tree-smiley-open-icon',
				closeIcon: 'mif-tree-smiley-close-icon'
			}
		},
		dfltType:'folder',
		onCopy: function(from, to, where, copy){
			if(from.getParent()==copy.getParent()){
				copy.set({
					name: 'copy '+from.get('name')
				});
			}
		},
		loaderOptions: 'Tree/files/mediumTree.json'
	});


	tree.load({
		url: 'Tree/files/forest.json'
	});
	
	

	
});
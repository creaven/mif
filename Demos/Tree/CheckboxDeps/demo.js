window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			this.initCheckbox('deps');
		},
		types: {
			dflt:{
				openIcon: 'mif-tree-open-icon',
				closeIcon: 'mif-tree-close-icon'
			},
			loader:{
				openIcon: 'mif-tree-loader-open-icon',
				closeIcon: 'mif-tree-loader-close-icon'
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
			books:{
				openIcon: 'mif-tree-books-icon',
				closeIcon: 'mif-tree-books-icon'
			},
			smiley:{
				openIcon: 'mif-tree-smiley-open-icon',
				closeIcon: 'mif-tree-smiley-close-icon'
			}
		}
	});

	//tree.initSortable();
	tree.load('Tree/files/forest.json');

	tree.loader.options=function(node){
		// if node name 'empty' load from url 'empty.json'
		return node.get('name')=='empty' ? 'Tree/files/empty.json' : 'Tree/files/mediumTree.json';
	}
	
	$('getChecked').addEvent('click', function(){
		var checked='';
		tree.getChecked().each(function(node){
			checked+='<p>'+node.get('name')+'</p>';
		});
		$('checked').innerHTML=checked;
	});
	
});
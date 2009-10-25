window.addEvent('domready',function(){
	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			this.initCheckbox('deps');
			new Mif.Tree.KeyNav(this);
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
				openIcon: 'mif-tree-book-icon',
				closeIcon: 'mif-tree-book-icon',
				loadable: true
			},
			bin:{
				openIcon: 'mif-tree-bin-open-icon',
				closeIcon: 'mif-tree-bin-close-icon'
			}
		}
	});

	//tree.initSortable();
	tree.load('Tree/files/forest.json');

	tree.loadOptions=function(node){
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
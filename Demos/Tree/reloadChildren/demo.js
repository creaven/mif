window.addEvent('domready',function(){

	Mif.Tree.Node.implement({
		reloadChildren: function() {
			if(this.contains(this.tree.selected) && this!=this.tree.selected){
	            this.tree.unselect();
	        }
			this.property.loaded=false;
			this.property.open=false;
			this.property.loadable=true;
			this.children=[];
			this.$draw=false;
			this.tree.$getIndex();
			this.getElement('children').innerHTML='';
			Mif.Tree.Draw.update(this);
			this.tree.mouse.node=null;
	        this.tree.updateHover();
			return this;
		}       

	});

	tree = new Mif.Tree({
		container: $('tree_container'),
		forest: true,
		initialize: function(){
			new Mif.Tree.Drag(this);
		}
	});
	
	tree.addEvent('loadChildren', function(parent){
		if(!parent) return;
		if(!parent.$name){
			parent.$name=parent.get('name');
		}
		parent.set({
			name: parent.$name+' ('+parent.children.length+')'
		});
	});

	tree.load({
		json:[{name: 'reload me', loadable: true}]
	});

	tree.loader.options=function(node){
		return {
			url: 'Tree/reloadChildren/get_json.php?'+$time()
		};
	}
	
	$('reload').addEvent('click', function(){
		var selected=tree.getSelected();
		if(!selected) return;
		selected.reloadChildren().toggle(true);
	});
	
});
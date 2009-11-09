/*
Mif.Tree.Selection
*/

Mif.sheet.addRules({
	
	'tree.focus node.selected': {
		'background-color': '#4891F3',
		'color': '#fff'
	},
	
	'tree node.selected': {
		'background-color': '#DEDEDE'
	}
	
});

Mif.Tree.implement({
	
	initSelection: function(){
		this.defaults.selectClass='';
		this.bound.attachSelection=this.attachSelection.bind(this);
		this.addEvent('mousedown', this.bound.attachSelection);
	},
	
	attachSelection: function(event){
		if(!['icon', 'name', 'node'].contains(this.mouse.target)) return;
		var node=this.mouse.node;
		if(!node) return;
		this.select(node);
	},
	
	select: function(node) {
		if(!node) return this;
		var current=this.selected;
		if (current==node) return this;
		if (current) {
			current.select(false);
			this.fireEvent('unSelect', [current]).fireEvent('selectChange', [current, false]);
		}
		this.selected = node;
		node.select(true);
		this.fireEvent('select', [node]).fireEvent('selectChange', [node, true]);
		return this;
	},
	
	unselect: function(){
		var current=this.selected;
		if(!current) return this;
		this.selected=false;
		current.select(false);
		this.fireEvent('unSelect', [current]).fireEvent('selectChange', [current, false]);
		return this;
	},
	
	getSelected: function(){
		return this.selected;
	},
	
	isSelected: function(node){
		return node.isSelected();
	}
	
});

Mif.Tree.Node.implement({
		
	select: function(state) {
		this.property.selected = state;
		if(!Mif.Tree.Draw.isUpdatable(this)) return;
		var wrapper=this.getDOM('wrapper');
		wrapper[(state ? 'add' : 'remove')+'Class'](this.property.selectClass||'selected');
	},
	
	isSelected: function(){
		return this.property.selected;
	}
	
});

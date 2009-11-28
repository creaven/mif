Mif.Component.implement({
	
	addSelection: function(){
		this.bound.attachSelection=this.attachSelection.bind(this);
		return this.addEvent('mousedown', this.bound.attachSelection);
	},
	
	attachSelection: function(event){
		var item=this.mouse.item;
		if(!item) return;
		this.select(item);
	},
	
	select: function(item) {
		if(!item) return this;
		var current=this.selected;
		if (current==item) return this;
		if (current) {
			current.select(false);
			this.fireEvent('unSelect', [current]).fireEvent('selectChange', [current, false]);
		}
		this.selected = item;
		item.select(true);
		this.fireEvent('select', [item]).fireEvent('selectChange', [item, true]);
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
	
	isSelected: function(item){
		return item==this.selected;
	}
	
});

Mif.Component.Item.implement({
		
	select: function(state) {
		this.property.selected = state;
		if(!this.owner.isUpdatable(this)) return;
		$splat(this.owner.selectionElement||this.owner.itemName).each(function(el){
			this.getElement(el)[(state ? 'add' : 'remove')+'Class']('selected');
		}, this);
		
	},
	
	isSelected: function(){
		return this.property.selected;
	}
	
});

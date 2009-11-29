
Mif.Tabs.Item.implement({
	
	inject: function(current, where){
		if($type(current)=='number'){
			current=this.owner.items[current];
		}
		if(!current){
			where=='bottom';
		}
		where=where||'after';
		if(where=='before'||where=='after'){
			this.getElement('tab').inject(current.getElement('tab'), where);
			this.getElement('content').inject(current.getElement('content'), where);
			this.owner.items.erase(this);
			this.owner.items.inject(this, current , where);
		}else{
			this.getElement('tab').inject(this.owner.header, where);
			this.getElement('content').inject(this.owner.container, where);
			this.owner.items.erase(this);
			this.owner.items[where=='top' ? 'unshift' : 'push'](this);
		}
		return this;
	}
	
});

Mif.Tabs.implement({
	
	add: function(newTab, currentTab, where){
		newTab.inject(currentTab, where);
		return this.fireEvent('add', [newTab, currentTab, where]);
	},
	
	remove: function(tab){
		if($type(tab)=='number'){
			tab=this.items[tab];
		};
		this.items.erase(tab);
		tab.getElement('tab').dispose();
		tab.getElement('content').dispose();
		return this.fireEvent('remove', tab);
	}
	
});

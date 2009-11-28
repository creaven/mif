
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
			this.header.inject(current.header, where);
			this.content.inject(current.content, where);
			this.owner.items.erase(this);
			this.owner.items.inject(this, current , where);
		}else{
			this.header.inject(this.owner.header, where);
			this.content.inject(this.owner.container, where);
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
		tab.header.dispose();
		tab.content.dispose();
		return this.fireEvent('remove', tab);
	}
	
});

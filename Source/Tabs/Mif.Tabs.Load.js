/*
Mif.Tabs.Load
*/

Mif.Tabs.implement({

	load: function(items){
		if(!items.length) return this;
		for(var i=0, l=items.length; i<l; i++){
			var tab=new Mif.Tabs.Item(items[i], {owner: this});
			this.draw(tab);
			this.items.push(tab);
			tab.header.inject(this.header);
			tab.content.inject(this.container);
		}
		this.header.adopt(new Element('bg', {'class': 'line'}));
		if(!this.selected){
			this.select(this.items[0]);
		}
	}

});

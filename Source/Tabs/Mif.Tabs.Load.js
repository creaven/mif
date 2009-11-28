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
		}
		if(!this.selected){
			this.select(this.items[0]);
		}
		this.width();
	}

});

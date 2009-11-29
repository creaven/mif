/*
Mif.Tabs.Draw
*/

Mif.Tabs.implement({
	
	draw: function(item){
		item.tab=new Element('tab', {
			id: 'mif-tabs-tab-'+item.UID,
			uid: item.UID,
			'class': item.property.selected ? 'selected' : ''
		}).inject(this.header).set('html', '<bg class="left"></bg><text>'+item.property.title+'</text>');
		item.content=new Element('content', {
			id: 'mif-tabs-content-'+item.UID,
			'class': item.property.selected ? 'selected' : ''
		});
		item.content.setContent(item.property.content).inject(this.container);
	},
	
	isUpdatable: function(item){
		return true;
	}
	
});

Mif.Tabs.Item.implement({
	
	getElement: function(element){
		if(element=='content'){
			return document.id('mif-tabs-content-'+this.UID);
		}
		if(element=='tab'){
			return document.id('mif-tabs-tab-'+this.UID);
		}
	}
	
});

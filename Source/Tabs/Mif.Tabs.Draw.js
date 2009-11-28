
Mif.Tabs.Item.implement({
	
	draw: function(){
		this.header=new Element('tab', {
			id: 'mif-tab-header-'+this.UID,
			uid: this.UID,
			'class': this.property.selected ? 'selected' : '',
			html: '<bg class="left"></bg><bg class="center"></bg><bg class="right"></bg><text>'+this.property.title+'</text>'
		});
		this.content=new Element('content', {
			id: 'mif-tab-content-'+this.UID,
			'class': this.property.selected ? 'selected' : ''
		});
		this.content.setContent(this.property.content);
	},
	
	getElement: function(element){
		if(element=='content'){
			return document.id('mif-tab-content-'+this.UID);
		}
		if(element=='header'){
			return document.id('mif-tab-header-'+this.UID);
		}
	}
	
});

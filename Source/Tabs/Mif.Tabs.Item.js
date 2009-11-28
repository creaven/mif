/*
Mif.Tabs.Item
*/

Mif.Tabs.Item = new Class({
	
	Implements: [Mif.Component.Item],
	
	initialize: function(property, struct){
		$extend(this, struct);
		this.property=property;
		if(property.selected){
			this.owner.selected=this;
		}
		this.UID=++Mif.UID;
		Mif.uids[this.UID]=this;
		var id=this.property.id;
		if(id!=null) Mif.ids[id]=this;
	},
	
	disable: function(){
		if(this.property.disabled) return false;
		this.property.disabled=true;
		this.getElement('header').addClass('disabled');
		this.getElement('content').addClass('disabled');
	},
	
	enable: function(){
		if(!this.property.disabled) return false;
		this.property.disabled=false;
		this.getElement('header').removeClass('disabled');
		this.getElement('content').removeClass('disabled');
	},
	
	index: function(){
		return this.owner.items.indexOf(this);
	},
	
	getNext: function(){
		return this.owner.items[this.index()+1]
	},
	
	getPrevious: function(){
		return this.owner.items[this.index()-1]
	}
	
});

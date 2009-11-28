/*
Mif.Tabs
*/


Mif.Tabs= new Class({
	
	Extends: Mif.Component,
	
	options: {
		
	},
	
	initialize: function(){
		this.element= new Element('tabs');
		this.header=new Element('header').inject(this.element);
		this.itemContainer=this.header;
		this.itemName='tab';
		this.selectionElement=['tab', 'content'];
		this.parent();
		this.container=new Element('container').inject(this.element);
		this.items=[];
		this.bound={};
		this.addSelection();
		this.width();
	},
	
	width: function(){
		
	}
	
});

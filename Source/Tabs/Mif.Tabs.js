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
		this.parent();
		this.container=new Element('container').inject(this.element);
		this.items=[];
		this.bound={};
		this.addSelection();
	},
	
	load: function(items){
		if(!items.length) return this;
		for(var i=0, l=items.length; i<l; i++){
			var tab=new Mif.Tabs.Item(items[i], {owner: this});
			this.items.push(tab);
			tab.header.inject(this.header);
			tab.content.inject(this.container);
		}
		this.header.adopt(new Element('bg', {'class': 'line'}));
		if(!this.selected){
			this.select(this.items[0]);
		}
	},
	
	addSelection: function(){
		this.bound.attachSelection=this.attachSelection.bind(this);
		this.addEvent('mousedown', this.bound.attachSelection);
	},
	
	attachSelection: function(event){
		var item=this.mouse.item;
		if(!item) return;
		this.select(item);
	},
	
	select: function(tab){
		if(this.selected==tab) return this;
		var selected=this.selected;
		if(selected){
			selected.property.selected=false;
			selected.getElement('header').removeClass('selected');
			selected.getElement('content').removeClass('selected');
		}
		this.selected=tab;
		tab.property.selected=true;
		tab.getElement('header').addClass('selected');
		tab.getElement('content').addClass('selected');
		return this;
	},
	
	getSelected: function(){
		return this.selected;
	}
	
});

Mif.Tabs.Item = new Class({
	
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
		this.draw();
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
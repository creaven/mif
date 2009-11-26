Mif.sheet.addRules({
	
	'tabs': {
		'width': '100%',
		'height': '100%',
		'position': 'absolute'
	},
	
	'tabs > wrapper.header': {
		'position': 'absolute',
		'height': '24px',
		'width': '100%',
		'cursor': 'default'
	},
	
	'tabs > wrapper.content': {
		'position': 'absolute',
		'top': '23px',
		'bottom': '0px',
		'width': '100%'
	},
	
	'tabs > wrapper.header > header': {
		'height': '22px',
		'margin-top': '1px',
		'display': 'inline-block',
		'position': 'relative',
		'font-family': '"Lucida Grande", "Lucida Sans Unicode", Arial, Verdana, sans-serif'
	},
	
	'tabs > wrapper.header > header.selected': {
		'z-index': '2'
	},
	
	'tabs > wrapper.content > content': {
		'position': 'absolute',
		'width': '100%',
		'top': '0px',
		'bottom': '0px',
		'display': 'none'
	},
	
	'tabs > wrapper.content > content.selected': {
		'display': 'block'
	},
	
	//normal tabs styles
	
	'tabs > wrapper.header header': {
		'min-width': '70px'
	},
	
	'tabs > wrapper.header text': {
		'position': 'relative',
		'display': 'inline-block',
		'height': '20px',
		'margin': '0 10px',
		'font-size': '12px'
	},
	
	'tabs > wrapper.header bg.left': {
		'position': 'absolute',
		'display': 'inline-block',
		'background': 'tab-left.png'.toMifImg(),
		'width': '10px',
		'height': '100%'
	},
	
	'tabs > wrapper.header bg.center': {
		'position': 'absolute',
		'display': 'inline-block',
		'background': 'tab-center.png'.toMifImg(),
		'left': '10px',
		'right': '10px',
		'height': '100%'
	},
	
	'tabs > wrapper.header bg.right': {
		'position': 'absolute',
		'display': 'inline-block',
		'background': 'tab-right.png'.toMifImg(),
		'width': '10px',
		'height': '100%',
		'right': '0px'
	},
	
	'tabs > wrapper.header bg.line': {
		'width': '100%',
		'height': '3px',
		'background': 'tab-line.png'.toMifImg(),
		'position': 'absolute',
		'left': '0',
		'bottom': '1px',
		'z-index': '1'
	},
	
	
	//mini tabs styles
	
	'tabs.mini > wrapper.header text': {
		'position': 'relative',
		'display': 'inline-block',
		'height': '100%',
		'margin': '0 10px',
		'font-size': '10px'
	},
	
	'tabs.mini > wrapper.header bg.left': {
		'position': 'absolute',
		'display': 'inline-block',
		'background': 'tab-mini-left.png'.toMifImg(),
		'width': '9px',
		'height': '100%'
	},
	
	'tabs.mini > wrapper.header bg.center': {
		'position': 'absolute',
		'display': 'inline-block',
		'background': 'tab-mini-center.png'.toMifImg(),
		'left': '9px',
		'right': '9px',
		'height': '100%'
	},
	
	'tabs.mini > wrapper.header bg.right': {
		'position': 'absolute',
		'display': 'inline-block',
		'background': 'tab-mini-right.png'.toMifImg(),
		'width': '9px',
		'height': '100%',
		'right': '0px'
	},
	
	'tabs.mini > wrapper.header bg.line': {
		'width': '100%',
		'height': '3px',
		'background': 'tab-mini-line.png'.toMifImg(),
		'position': 'absolute',
		'left': '0',
		'bottom': '0',
		'z-index': '1'
	}
	
})



Mif.Tabs= new Class({
	
	Implements: [Events, Options],
	
	options: {
		
	},
	
	initialize: function(){
		this.element= new Element('tabs');
		this.header=new Element('wrapper', {'class': 'header'}).inject(this.element);
		this.content=new Element('wrapper', {'class': 'content'}).inject(this.element);
		this.tabs=[];
		this.bound={};
		this.initEvents();
	},
	
	inject: function(element, how){
		this.element.inject(element, how);
		return this;
	},
	
	load: function(items){
		if(!items.length) return this;
		for(var i=0, l=items.length; i<l; i++){
			var tab=new Mif.Tab(items[i], {tabs: this});
			this.tabs.push(tab);
			tab.header.inject(this.header);
			tab.content.inject(this.content);
		}
		this.header.adopt(new Element('bg', {'class': 'line'}));
		if(!this.selected){
			this.select(this.tabs[0]);
		}
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
	},
	
	initEvents: function(){
		$extend(this.bound,{
			onHeaderClick: this.onHeaderClick.bind(this)
		});
		this.header.addEvent('click', this.bound.onHeaderClick);
	},
	
	onHeaderClick: function(event){
		var target=$(event.target);
		var header=target.getAncestor('header', this.header);
		if(!header) return;
		var tab=Mif.uids[header.getAttribute('id').split('tab-header-')[1]];
		this.select(tab);
	}
	
});

Mif.Tab = new Class({
	
	initialize: function(property, struct){
		this.tabs=struct.tabs;
		this.property=property;
		if(property.selected){
			tabs.selected=this;
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
	}
	
});


Mif.Tab.implement({
	
	draw: function(){
		this.header=new Element('header', {
			id: 'tab-header-'+this.UID,
			'class': this.property.selected ? 'selected' : '',
			html: '<bg class="left"></bg><bg class="center"></bg><bg class="right"></bg><text>'+this.property.title+'</text>'
		});
		this.content=new Element('content', {
			id: 'tab-content-'+this.UID,
			'class': this.property.selected ? 'selected' : ''
		});
		this.content.setContent(this.property.content);
	},
	
	getElement: function(element){
		if(element=='content'){
			return document.id('tab-content-'+this.UID);
		}
		if(element=='header'){
			return document.id('tab-header-'+this.UID);
		}
	}
	
});

Mif.Tab.implement({
	
	inject: function(current, where){
		if($type(current)=='number'){
			current=this.tabs.tabs[current];
		}
		if(!current){
			where=='bottom';
		}
		where=where||'after';
		if(where=='before'||where=='after'){
			this.header.inject(current.header, where);
			this.content.inject(current.content, where);
			this.tabs.tabs.inject(this, current , where);
		}else{
			this.header.inject(this.tabs.header, where);
			this.content.inject(this.tabs.content, where);
			this.tabs.tabs[where=='top' ? 'unshift' : 'push'](this);
		}
		return this;
	}
	
})

Mif.Tabs.implement({
	
	add: function(newTab, currentTab, where){
		newTab.inject(currentTab, where);
		return this.fireEvent('add', [newTab, currentTab, where]);
	},
	
	remove: function(tab){
		if($type(tab)=='number'){
			tab=this.tabs[tab];
		};
		this.tabs.erase(tab);
		tab.header.dispose();
		tab.content.dispose();
		return this.fireEvent('remove', tab);
	}
	
});
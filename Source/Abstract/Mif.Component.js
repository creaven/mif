/*
Mif.Component abstract class

Mif.Tree - Mif.Tree.Item  -> Mif.Tree.Item - node, itemContainer - wrapper, itemName - 'row', name - 'tree'
Mif.Menu - Mif.Menu.Item - menu item, itemContainer - ?, itemName - 'item', name - 'menu'
Mif.Tabs - Mif.Tabs.Item - tab, itemContainer - header, itemName - 'tab', name - 'tabs'
Mif.Grid - Mif.Grid.Item - field, itemContainer - element, itemName - 'field', name - 'grid'
*/


Mif.Component=new Class({
	
	Extends: Mif.Element,
	
	initialize: function(){
		if(this.constructor.KeyNav){
			new this.constructor.KeyNav(this);
		}
		this.Item=this.constructor.Item;
		this.parent();
		this.events();
		this.addSelection();
	},
		
	events: function(){
		this.bound('mouseleave', 'mousedown', 'mouseup', 'mouse', 'stopSelection', 'focus');
		this.itemContainer.addEvents({
			mousedown: this.bound.mousedown,
			mouseover: this.bound.mouse,
			mouseout: this.bound.mouse,
			mouseleave: this.bound.mouseleave
		});
		Mif.addEvent('mouseup', this.bound.mouseup);
		if(Browser.Engine.trident){
			this.itemContainer.addEvent('selectstart', this.bound.stopSelection);
		};
		if(this.focusable){
			this.addEvent('mousedown', this.bound.focus);
		}
	},
	
	stopSelection: function(event){
		var target=$(event.target);
		var selectable=this.options.selectable||[];
		for(var i=0, l=selectable.length;i<l;i++){
			if(target.match(selectable[i])) return true;
		}
		event.preventDefault();
	},
	
	mouse: function(event){
		var target=Browser.Engine.trident ? document.elementFromPoint(event.client.x, event.client.y) : event.target;//ie returns wrong event.target after scroll
		if(!target||target==document){
			this.mouse.target=null;
			this.mouse.item=null;
			this.mouse.element=null;
		}else{
			this.mouse.target=target.tagName.toLowerCase();
			this.mouse.element=target;
			var item=document.id(target).getAncestor(this.itemName);
			this.mouse.item= item ? Mif.uids[item.getAttribute('uid')] : null;
		}
	},
	
	mouseleave: function(event){
		this.mouse.coords={x:null,y:null};
		this.mouse.target=false;
		this.mouse.element=false;
		this.mouse.item=false;
		this.fireEvent('mouseleave', [event]);
	},
	
	mousedown: function(event){
		this.mouse(event);
		this.mouse.active=event.target.addClass('active');
		if(!Browser.Engine.trident){
			this.stopSelection(event);
			window.focus();
		}
		this.fireEvent('mousedown', [event]);
	},
	
	mouseup: function(event){
		if(this.mouse.active){
			this.mouse.active.removeClass('active');
			this.mouse.active=null;
		};
	},
    
	focus: function(){
		if(Mif.Focus==this) return this;
		if(Mif.Focus){
			Mif.Focus.blur();
		}
		Mif.Focus=this;
		this.element.addClass('focus');
		return this.fireEvent('focus');
	},
    
	blur: function(){
		if(Mif.Focus!=this) return this;
		Mif.Focus=null;
		this.element.removeClass('focus');
		return this.fireEvent('blur');
	}
	
});

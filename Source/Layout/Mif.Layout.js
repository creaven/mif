/*
Mif.Layout
*/


Mif.Layout=new Class({

	Extends: Mif.Element,
	
	options: {
		left: {
			width: 150,
			minWidth: 50,
			maxWidth: 200
		},
		right: {
			width: 50,
			minWidth: 50,
			maxWidth: 200
		},
		top: {
			height: 120,
			minHeight: 50,
			maxHeight: 200
		},
		bottom: {
			height: 100,
			minHeight: 50,
			maxHeight: 200
		}
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.element=new Element('layout');
		this.size={
			left: this.options.left.width,
			right: this.options.right.width,
			top: this.options.top.height,
			bottom: this.options.bottom.height
		};
		this.handle={};
		['left', 'right', 'top', 'bottom', 'center'].each(function(side){
			this[side]=new Element(side).inject(this.element);
			if(side!='center') this.handle[side]=new Element('handle', {'class': side}).inject(this.element);
		}, this);
		this.handleWidth=Mif.sheet.getRule('layout > handle').style.width.toInt();
		this.handleHeight=Mif.sheet.getRule('layout > handle').style.height.toInt();
		this.parent();
		this.position();
		this.mouse={};
		this.events();
		this.overlay=new Element('overlay');
	},
	
	inject: function(element, how){
		this.parent(element, how);
		this.position();
		return this;
	},
	
	position: function(){
		this.left.setStyles({
			width: this.size.left,
			top: this.size.top,
			bottom: this.size.bottom
		});
		this.handle.left.setStyles({
			left: this.size.left-this.handleWidth/2,
			top: this.size.top,
			bottom: this.size.bottom
		});
		this.handle.right.setStyles({
			right: this.size.right-this.handleWidth/2,
			top: this.size.top,
			bottom: this.size.bottom
		});
	 	this.handle.top.setStyles({
			top: this.size.top-this.handleHeight/2
		});
	 	this.handle.bottom.setStyles({
			bottom: this.size.bottom-this.handleHeight/2
		});
		this.center.setStyles({
			left: this.size.left,
			width: Math.max(0, this.element.offsetWidth-this.size.left-this.size.right),
			top: this.size.top,
			height: Math.max(0, this.element.offsetHeight-this.size.top-this.size.bottom)
		});
		this.right.setStyles({
			width: this.size.right,
			top: this.size.top,
			bottom: this.size.bottom
		});
		this.top.setStyles({
				height: this.size.top
		});
		this.bottom.setStyles({
			height: this.size.bottom
		});
	},
	
	setSize: function(side, size){
		var maxSize=(side=='left'||side=='right') ? 'maxWidth' : 'maxHeight';
		var minSize=(side=='left'||side=='right') ? 'minWidth' : 'minHeight';
		var max=this.options[side][maxSize].toInt();
		var min=this.options[side][minSize].toInt();
		if(size<=min){
			size=min;
		}
		if(size>=max){
			size=max;
		}
		this.size[side]=size;
	},
	
	addOverlay: function(){
		this.overlay.inject(document.body).setStyles({
			'cursor': this.handle[this.mouse.side].getStyle('cursor')
		});
	},
	
	removeOverlay: function(){
		this.overlay.dispose();
	},
	
	events: function(){
		this.bound={
			mousedown: this.mousedown.bind(this),
			mousemove: this.mousemove.bind(this),
			mouseup: this.mouseup.bind(this)
		};
		['left', 'right', 'top', 'bottom'].each(function(side){
			this.handle[side].addEvent('mousedown', this.bound.mousedown);
		}, this);
	},
	
	mousedown: function(event){
		this.mouse.side=event.target.get('class');
		this.mouse.start=event.page;
		event.preventDefault();
		document.addEvents({
			mousemove: this.bound.mousemove,
			mouseup: this.bound.mouseup
		});
		this.addOverlay();
	},
	
	mousemove: function(event){
		var side=this.mouse.side;
		switch(side){
			case 'left': this.setSize(side, event.page.x); break;
			case 'right': this.setSize(side, this.element.offsetWidth-event.page.x); break;
			case 'top': this.setSize(side, event.page.y); break;
			case 'bottom': this.setSize(side, this.element.offsetHeight-event.page.y); break;
		}
		
		this.position();
	},
	
	mouseup: function(event){
		document.removeEvents({
			mousemove: this.bound.mousemove,
			mouseup: this.bound.mouseup
		});
		this.removeOverlay();
	}
	
});

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
		this.container=new Element('container').inject(this.element);
		this.scrollLeft=new Element('scroll', {'class': 'left'}).inject(this.element);
		this.scrollRight=new Element('scroll', {'class': 'right'}).inject(this.element);
		this.line=new Element('bg', {'class': 'line'}).inject(this.header).setStyle('opacity',0.5);
		this.itemContainer=this.header;
		this.itemName='tab';
		this.selectionElement=['tab', 'content'];
		this.parent();
		this.items=[];
		this.bound.width=this.width.bind(this);
		this.addEvent('resize', this.bound.width);
		this.scroll=new Fx.Scroll(this.header, {link: 'cancel'});
	},
	
	events: function(){
		this.parent();
		$extend(this.bound, {
			scrollToLeft: this.scrollToLeft.bind(this),
			scrollToRight: this.scrollToRight.bind(this)
		});
		this.scrollLeft.addEvent('mousedown', this.bound.scrollToLeft);
		this.scrollRight.addEvent('mousedown', this.bound.scrollToRight);
	},
	
	width: function(){
		var fullWidth=this.header.offsetWidth;
		var count=this.items.length;
		if(!count) return this;
		var minWidth=this.items[0].tab.getStyle('min-width').toInt();
		var width=(fullWidth/count).toInt();
		if(width>=minWidth){
			this.addRule('> header > tab', {
				width: (fullWidth/count).toInt()+'px'
			});
		}else{
			this.showScroll();
			this.tabWidth=this.items[0].tab.offsetWidth;
			this.line.setStyle('width', this.header.scrollWidth);
		}
	},
	
	showScroll: function(){
		this.element.addClass('scroll');
	},
	
	scrollTo: function(item){
		if(!this.header.hasClass('scroll')) return;
		var left=item.tab.offsetLeft;
		var right=left+item.tab.offsetWidth;
	},
	
	scrollToLeft: function(event){
		event.preventDefault();
		var first=this.getFirstVisible();
		this.scroll.start((first-2)*this.tabWidth, 0);
	},
	
	scrollToRight: function(event){
		event.preventDefault();
		var last=this.getLastVisible();
		this.scroll.start((last+2)*this.tabWidth-this.header.clientWidth, 0);
	},
	
	getFirstVisible: function(){
		return (this.header.scrollLeft/this.tabWidth).ceil();
	},
	
	getLastVisible: function(){
		return ((this.header.scrollLeft+this.header.clientWidth)/this.tabWidth).floor();
	}
	
	
});

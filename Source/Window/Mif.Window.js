/*
Mif.Window
*/

Mif.Window=new Class({
	
	Extends: Mif.Element,
	
	options: {
		title: 'untitled',
		tbar: null,
		bbar: null
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.element=new Element('window').inject(document.body);
		var html='<bg>'+Mif.bg+'</bg>'+
			'<titlebar>'+
			 	'<text>'+this.options.title+'</text>'+ 
			'</titlebar>'+
			'<content></content>'+
			'<bottombar></bottombar>'+
			'<handle></handle>';
		this.element.innerHTML=html;
		this.injectElement=this.element.getElement('content');
		this.events();
		this.registerResizable();
		this.setHandle();
		this.makeDraggable();
		if(this.options['class']){
			this.element.addClass(this.options['class']);
		}
		this.height();
		this.height();//ie7
	},
	
	events: function(){
		
	},
	
	setHandle: function(){
		this.element.makeResizable({
			handle: this.element.getElement('handle'),
			onDrag: function(){
				this.height();
				this.fireEvent('resize');
				Mif.fireEvent('resize', this);
			}.bind(this),
			limit: {x: [100, 10000], y: [100, 10000]}
		});
	},
	
	makeDraggable: function(){
		this.element.makeDraggable({
			handle: this.element.getElement('titlebar')
		});
	},
	
	height: function(){
		var height=this.element.offsetHeight - this.getElement('titlebar').offsetHeight - this.getElement('bottombar').offsetHeight;
		this.getElement('content').setStyle('height', height);
	}
	
})
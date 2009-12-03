
Mif.sheet.addRules({
	
	'window': {
		'width': '200px',
		'height': '200px',
		'position': 'absolute',
		//'border': 'solid 1px black',
		'font-family': '"Lucida Grande", Helvetica, Arial, Verdana, sans-serif',
		'font-size': '12px',
		'color': '#000',
		'z-index': 10,
		'left': '10px',
		'top': '10px'
	},
	
	'window handle': {
		'position': 'absolute',
		'bottom': '0',
		'right': '0',
		'width': '11px',
		'height': '11px',
		'background': 'window-handle.png'.toMifImg()+ ' -1px -1px no-repeat'
	},

	'window content': {
		'top': '20px',
		'width': '100%',
		'position': 'absolute'
	},
	
	'window bottombar': {
		'width': '100%',
		'height': '20px',
		//'background': 'red',
		'position': 'absolute',
		'left': '0',
		'bottom':'0'
	},
	
	'window titlebar': {
		//'display': 'none',
		'width': '100%',
		'height': '20px',
		//'background': 'green',
		'position': 'absolute',
		'left': '0',
		'top': '0',
		'text-align': 'center',
		'border-bottom': 'solid 1px #EAEAEA'
	},
	
	'window titlebar text': {
		'line-height': '20px',
		'cursor': 'default'
	}

	
})
.addBackground('window > bg', 'window', {
	'left': 36,
	'top': 30,
	'right': 30,
	'bottom': 30,
	'padding-left': 28,
	'padding-top': 26,
	'l': -13,
	't': -11
})
.addBackground('window.blur > bg', 'window-blur', {
	'left': 42,
	'top': 42,
	'right': 37,
	'bottom': 51,
	'padding-left': 39,
	'padding-top': 39,
	'l': -19,
	't': -8
});

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
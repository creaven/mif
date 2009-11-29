
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
		'top': '10px',
		'background': '#C4C4C41'
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
		'bottom': '20px',
		'width': '100%',
		//'background': '#EDE3DD',
		'position': 'absolute'
	},
	
	'window bbar': {
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
			'<handle></handle>';
		this.element.innerHTML=html;
		this.events();
		this.setHandle();
		this.makeDraggable();
		if(this.options['class']){
			this.element.addClass(this.options['class']);
		}
	},
	
	events: function(){
		
	},
	
	setHandle: function(){
		this.element.makeResizable({
			handle: this.element.getElement('handle'),
			limit: {x: [100, 10000], y: [100, 10000]}
		});
	},
	
	makeDraggable: function(){
		this.element.makeDraggable({
			handle: this.element.getElement('titlebar')
		});
	}
	
})
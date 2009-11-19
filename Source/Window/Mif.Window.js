
Mif.sheet.addRules({
	
	'window': {
		'width': '200px',
		'height': '200px',
		'position': 'absolute',
		//'border': 'solid 1px black',
		'z-index': 10,
		'left': '10px',
		'top': '10px',
		'background': '#C4C4C41'
	},
	
	'window img': {
		'width': '100%',
		'height': '100%',
		'position': 'absolute'
	},
	
	'window handle': {
		'position': 'absolute',
		'bottom': '0',
		'right': '0',
		'width': '11px',
		'height': '11px',
		'background-image': 'window-handle.png'.toMifImg()
	},

	'window content': {
		'top': '50px',
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
	
	'window tbar': {
		//'display': 'none',
		'width': '100%',
		'height': '50px',
		//'background': 'green',
		'position': 'absolute',
		'left': '0',
		'top': '0'
	},



	"window.top-noround > bg .tl": {
		"background-image": "window-noround-tl.png".toMifImg()
	},
	
	"window.top-noround > bg .tr": {
		"background-image": "window-noround-tr.png".toMifImg()
	},
	
	"window.bottom-noround > bg .bl": {
		"background-image": "window-noround-bl.png".toMifImg()
	},
	
	"window.bottom-noround > bg .br": {
		"background-image": "window-noround-br.png".toMifImg()
	},
	
	
//window blured

	"window.blur.top-noround > bg .tl": {
		"background-image": "window-blur-noround-tl.png".toMifImg()
	},
	
	"window.blur.top-noround > bg .tr": {
		"background-image": "window-blur-noround-tr.png".toMifImg()
	},
	
	"window.blur.bottom-noround > bg .bl": {
		"background-image": "window-blur-noround-bl.png".toMifImg()
	},
	
	"window.blur.bottom-noround > bg .br": {
		"background-image": "window-blur-noround-br.png".toMifImg()
	}	
	
})
.addBackground('window > bg', 'window', {
	'left': 58,
	'top': 53,
	'right': 65,
	'bottom': 60,
	'padding-left': 54,
	'padding-top': 54,
	'l': -27,
	't': -16
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
})
.addBackground('window tbar > bg', 'window-tbar', {
	'left': 5,
	'top': 5,
	'right': 5,
	'bottom': 5
})
.addBackground('window bbar > bg', 'window-bbar', {
	'left': 5,
	'top': 5,
	'right': 5,
	'bottom': 5
});


Mif.Window=new Class({
	
	Implements: [Events, Options],
	
	options: {
		title: 'untitled',
		tbar: null,
		bbar: null
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.element=new Element('window').inject(document.body);
		var html='<bg>'+Mif.bg+'</bg><tbar><bg>'+Mif.bg+'</bg><img src="'+'gradient.png'.toMifImg(true)+'"></img></tbar><content></content><bbar><bg>'+Mif.bg+'</bg><img src="'+'gradient.png'.toMifImg(true)+'"></img></bbar><handle></handle>';
		this.element.innerHTML=html//'<bg class="left"></bg><bg class="center"></bg><bg class="right"></bg>';
		this.initEvents();
		this.setHandle();
		if(this.options['class']){
			this.element.addClass(this.options['class']);
		}
	},
	
	initEvents: function(){
		
	},
	
	setHandle: function(){
		this.element.makeResizable({
			handle: this.element.getElement('handle')
		});
	}
	
})
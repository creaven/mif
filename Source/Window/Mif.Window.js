
Mif.sheet.addRules({
	
	'window': {
		'width': '200px',
		'height': '200px',
		'position': 'absolute',
		//'border': 'solid 1px black',
		'z-index': 10,
		'left': '10px',
		'top': '10px',
		'background-color': '#9696969'
	},
	
	'window handle': {
		'position': 'absolute',
		'bottom': '0',
		'right': '0',
		'width': '18px',
		'height': '18px',
		'background-image': 'window-handle.png'.toMifImg()
	},
	
	'window content': {
		'top': '50px',
		'bottom': '20px',
		'width': '100%',
		'background': '#EDE3DD',
		'position': 'absolute'
	},
	
	'window bbar': {
		'width': '100%',
		'height': '20px',
		'background': 'red',
		'position': 'absolute',
		'left': '0',
		'bottom':'0'
	},
	
	'window tbar': {
		'width': '100%',
		'height': '50px',
		'background': 'green',
		'position': 'absolute',
		'left': '0',
		'top': '0'
	},
	
	"window bg, window bg div": {
	"position": "absolute",
	"overflow": "hidden"
	},

	"window bg ": {
	"left":"-5px",
	"top": "-5px",
	"padding-left":"10px",
	"padding-top":  "10px",
	"width": "100%",
	"height": "100%"
	},

	"window bg .top": {
	"height": "124px",
	"width": "100%",
	"position": "relative",
	"top":"-10px",
	"padding-left":"10px",
	"padding-top": "10px",
	"left":"-10px"
	},

	"window bg .center": {
	"height": "100%",
	"width": "100%",
	"position": "relative",
	"top":"-148px",
	"padding-left":"10px",
	"padding-top": "10px",
	"left":"-10px"
	},

	"window bg .bottom": {
	"height": "2px",
	"width": "100%",
	"top":"-148px",
	"position": "relative",
	"padding-left":"10px",
	"left":"-10px"
	},

	"window bg .tl": {
	"width": "8px",
	"height": "124px",
	"background": "window-tl.png".toMifImg(),
	"left":"0px",
	"top": "0px"
	},

	"window bg .tr": {
	"width": "3px",
	"height": "124px",
	"float": "right",
	"position": "relative",
	"background": "window-tr.png".toMifImg(),
	"top":"-10px"
	},

	"window bg .t": {
	"height": "124px",
	"width": "100%",
	"left":"-13px",
	"top": "0",
	"clip": "rect(auto auto auto 21px)",
	"background": "window-t.png".toMifImg(),
	"padding-left":"10px"
	},

	".ie6 window bg .t": {
	"left":"-3px",
	"clip": "rect(auto auto auto 11px)"
	},

	"window bg .bl": {
	"width": "8px",
	"height": "2px",
	"background": "window-bl.png".toMifImg(),
	"left":"0px"
	},

	"window bg .br": {
	"width": "3px",
	"height": "2px",
	"float": "right",
	"position": "relative",
	"background": "window-br.png".toMifImg()
	},

	"window bg .b": {
	"height": "2px",
	"width" : "100%",
	"left":"-13px",
	"clip": "rect(auto auto auto 21px)",
	"background": "window-b.png".toMifImg(),
	"padding-left":"10px"
	},

	"window bg .l": {
	"height" : "10000px",
	"width": "8px",
	"left":"0",
	"top": "128px",
	"background": "window-l.png".toMifImg()
	},

	"window bg .r": {
	"height" : "10000px",
	"width": "3px",
	"top": "118px",
	"float": "right",
	"position": "relative",
	"background": "window-r.png".toMifImg()
	},

	"window bg .c": {
	"height": "10000px",
	"width" : "100%",
	"left":"-13px",
	"top": "128px",
	"clip": "rect(auto auto auto 21px)",
	"background": "window-c.png".toMifImg(),
	"padding-left":"10px"
	}


	


	
	/*'window bg': {
		'position': 'absolute'
	},
	
	'window bg.left': {
		'background-repeat': 'no-repeat',
		'background-image': 'window-left.png'.toMifImg(),
		'left': '0',
		'top': '0',
		'width': '6px',
		'height': '132px'
	},
	
	'window bg.center': {
		'background-repeat': 'repeat-x',
		'background-image': 'window-center.png'.toMifImg(),
		'left': '6px',
		'right': '6px',
		'height': '132px'
	},
	
	'window bg.right': {
		'background-repeat': 'no-repeat',
		'background-image': 'window-right.png'.toMifImg(),
		'right': '0',
		'top': '0',
		'width': '6px',
		'height': '132px'
	}*/
	
});


Mif.Window=new Class({
	
	Implements: [Events, Options],
	
	options: {
		title: 'untitled',
		tbar: null,
		bbar: null
	},
	
	initialize: function(){
		this.element=new Element('window').inject(document.body);
		html='<bg><div class="top">'+
					'<div class="tl"></div>'+
					'<div class="t"></div>'+
					'<div class="tr"></div>'+
				'</div>'+
				'<div class="center">'+
					'<div class="l"></div>'+
					'<div class="c"></div>'+
					'<div class="r"></div>'+
				'</div>'+
				'<div class="bottom">'+
					'<div class="bl"></div>'+
					'<div class="b"></div>'+
					'<div class="br"></div>'+
				'</div></bg><tbar></tbar><content></content><bbar></bbar><handle></handle>';
		this.element.innerHTML=html//'<bg class="left"></bg><bg class="center"></bg><bg class="right"></bg>';
		this.initEvents();
		this.setHandle();
	},
	
	initEvents: function(){
		
	},
	
	setHandle: function(){
		this.element.makeResizable({
			handle: this.element.getElement('handle')
		});
	}
	
})
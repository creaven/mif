
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
		'width': '100%',
		'height': '50px',
		//'background': 'green',
		'position': 'absolute',
		'left': '0',
		'top': '0'
	},
	
	"window bg, window bg div": {
	"position": "absolute",
	"overflow": "hidden"
	},

	"window bg ": {
	"left":"-17px",
	"top": "-10px",
	"padding-left":"36px",
	"padding-top":  "68px",
	"width": "100%",
	"height": "100%"
	},

	"window bg .top": {
	"height": "26px",
	"width": "100%",
	"position": "relative",
	"top":"-68px",
	"padding-left":"36px",
	"padding-top": "68px",
	"left":"-36px"
	},

	"window bg .center": {
	"height": "100%",
	"width": "100%",
	"position": "relative",
	"top":"-232px",
	"padding-left":"36px",
	"padding-top": "68px",
	"left":"-36px"
	},

	"window bg .bottom": {
	"height": "35px",
	"width": "100%",
	"top":"-232px",
	"position": "relative",
	"padding-left":"36px",
	"left":"-36px"
	},

	"window bg .tl": {
	"width": "34px",
	"height": "26px",
	"background": "window-bg-tl.png".toMifImg(),
	"left":"0px",
	"top": "0px"
	},

	"window bg .tr": {
	"width": "31px",
	"height": "26px",
	"float": "right",
	"position": "relative",
	"background": "window-bg-tr.png".toMifImg(),
	"top":"-68px"
	},

	"window bg .t": {
	"height": "26px",
	"width": "100%",
	"left":"-67px",
	"top": "0",
	"clip": "rect(auto auto auto 101px)",
	"background": "window-bg-t.png".toMifImg(),
	"padding-left":"36px"
	},

	".ie6 window bg .t": {
	"left":"-31px",
	"clip": "rect(auto auto auto 65px)"
	},

	"window bg .bl": {
	"width": "34px",
	"height": "35px",
	"background": "window-bg-bl.png".toMifImg(),
	"left":"0px"
	},

	"window bg .br": {
	"width": "31px",
	"height": "35px",
	"float": "right",
	"position": "relative",
	"background": "window-bg-br.png".toMifImg()
	},

	"window bg .b": {
	"height": "35px",
	"width" : "100%",
	"left":"-67px",
	"clip": "rect(auto auto auto 101px)",
	"background": "window-bg-b.png".toMifImg(),
	"padding-left":"36px"
	},

	"window bg .l": {
	"height" : "10000px",
	"width": "34px",
	"left":"0",
	"top": "96px",
	"background": "window-bg-l.png".toMifImg()
	},

	"window bg .r": {
	"height" : "10000px",
	"width": "31px",
	"top": "28px",
	"float": "right",
	"position": "relative",
	"background": "window-bg-r.png".toMifImg()
	},

	"window bg .c": {
	"height": "10000px",
	"width" : "100%",
	"left":"-67px",
	"top": "96px",
	"clip": "rect(auto auto auto 101px)",
	"background": "window-bg-c.png".toMifImg(),
	"padding-left":"36px"
	},
	
//tbar styles

	"window bg.tbar, window bg.tbar div": {
	"position": "absolute",
	"overflow": "hidden"
	},

	"window bg.tbar ": {
	"left":"0px",
	"top": "0px",
	"padding-left":"0px",
	"padding-top":  "0px",
	"width": "100%",
	"height": "100%"
	},

	"window bg.tbar .top": {
	"height": "5px",
	"width": "100%",
	"position": "relative",
	"top":"-0px",
	"padding-left":"0px",
	"padding-top": "0px",
	"left":"-0px"
	},

	"window bg.tbar .center": {
	"height": "100%",
	"width": "100%",
	"position": "relative",
	"top":"-10px",
	"padding-left":"0px",
	"padding-top": "0px",
	"left":"-0px"
	},

	"window bg.tbar .bottom": {
	"height": "5px",
	"width": "100%",
	"top":"-10px",
	"position": "relative",
	"padding-left":"0px",
	"left":"-0px"
	},

	"window bg.tbar .tl": {
	"width": "5px",
	"height": "5px",
	"background": "window-tbar-tl.png".toMifImg(),
	"left":"0px",
	"top": "0px"
	},

	"window bg.tbar .tr": {
	"width": "5px",
	"height": "5px",
	"float": "right",
	"position": "relative",
	"background": "window-tbar-tr.png".toMifImg(),
	"top":"-0px"
	},

	"window bg.tbar .t": {
	"height": "5px",
	"width": "100%",
	"left":"-5px",
	"top": "0",
	"clip": "rect(auto auto auto 10px)",
	"background": "window-tbar-t.png".toMifImg(),
	"padding-left":"0px"
	},

	".ie6 window bg.tbar .t": {
	"left":"-5px",
	"clip": "rect(auto auto auto 10px)"
	},

	"window bg.tbar .bl": {
	"width": "5px",
	"height": "5px",
	"background": "window-tbar-bl.png".toMifImg(),
	"left":"0px"
	},

	"window bg.tbar .br": {
	"width": "5px",
	"height": "5px",
	"float": "right",
	"position": "relative",
	"background": "window-tbar-br.png".toMifImg()
	},

	"window bg.tbar .b": {
	"height": "5px",
	"width" : "100%",
	"left":"-5px",
	"clip": "rect(auto auto auto 10px)",
	"background": "window-tbar-b.png".toMifImg(),
	"padding-left":"0px"
	},

	"window bg.tbar .l": {
	"height" : "10000px",
	"width": "5px",
	"left":"0",
	"top": "10px",
	"background": "window-tbar-l.png".toMifImg()
	},

	"window bg.tbar .r": {
	"height" : "10000px",
	"width": "5px",
	"top": "10px",
	"float": "right",
	"position": "relative",
	"background": "window-tbar-r.png".toMifImg()
	},

	"window bg.tbar .c": {
	"height": "10000px",
	"width" : "100%",
	"left":"-5px",
	"top": "10px",
	"clip": "rect(auto auto auto 10px)",
	"background": "window-tbar-c.png".toMifImg(),
	"padding-left":"0px"
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
		var bg8='<div class="top">'+
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
				'</div>';
		var html='<bg>'+bg8+'</bg><tbar><bg class="tbar">'+bg8+'</bg><img src="'+'gradient.png'.toMifImg(true)+'"></img></tbar><content></content><bbar></bbar><handle></handle>';
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
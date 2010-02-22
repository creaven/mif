/*
Mif.Window.Sheet
*/

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
		'display': 'block'
	},
	
	'window > handle': {
		'position': 'absolute',
		'bottom': '0',
		'right': '0',
		'width': '11px',
		'height': '11px',
		'display': 'block',
		'background': 'window-handle.png'.toMifImg()+ ' -1px -1px no-repeat'
	},

	'window > content': {
		'top': '0',
		'width': '100%',
		'position': 'relative',
		'display': 'block'
	},
	
	'window > bottombar': {
		'width': '100%',
		'height': '20px',
		'display': 'block',
		'position': 'absolute',
		'left': '0',
		'bottom':'0'
	},
	
	'window > titlebar': {
		'display': 'block',
		'width': '100%',
		'min-height': '20px',
		//'background': 'green',
		'position': 'relative',
		'left': '0',
		'top': '0',
		'text-align': 'center',
		'white-space': 'nowrap',
		'border-bottom': 'solid 1px #EAEAEA',
		'overflow': 'hidden'
	},
	
	'window > titlebar text': {
		'line-height': '20px',
		'cursor': 'default',
		'display': 'block',
		'position': 'relative',
		'margin': 'auto'
	},
	
	'window > titlebar toolbar': {
		'display': 'block',
		'width': '100%',
		'top': '21px',
		'position': 'relative',
		'overflow': 'hidden'
	},
	
	'window > titlebar toolbar.hidden': {
		'height': '0'
	},
	
	//buttons styles
	
	'window > titlebar group': {
		'display': 'block',
		'height': '20px',
		'position': 'absolute',
		'left': '3px',
		'top': '1px',
		'padding-right': '3px',
		'z-index': '1',
		'background': 'transparent.png'.toMifImg()
	},
	
	'pushbutton.window': {
		'width': '15px',
		'height': '15px',
		'padding': '0',
		'min-width': '0',
		'background': 'window-button.png'.toMifImg()+' center center no-repeat',
		'margin': '2px'
	},
	
	'pushbutton.window bg, pushbutton.window.hover bg, pushbutton.window.active bg': {
		'display': 'none'
	},
	
	'pushbutton.window.close': {
		'background-image': 'window-close.png'.toMifImg()
	},
	
	'window > titlebar .hover pushbutton.window.close': {
		'background-image': 'window-close-hover.png'.toMifImg()
	},

	'pushbutton.window.close.hover.active': {
		'background-image': 'window-close-active.png'.toMifImg()
	},
	
	'pushbutton.window.expand': {
		'background-image': 'window-expand.png'.toMifImg()
	},
	
	'window > titlebar .hover pushbutton.window.expand': {
		'background-image': 'window-expand-hover.png'.toMifImg()
	},

	'pushbutton.window.expand.hover.active': {
		'background-image': 'window-expand-active.png'.toMifImg()
	},

	'pushbutton.window.collapse': {
		'background-image': 'window-collapse.png'.toMifImg()
	},

	'window > titlebar .hover pushbutton.window.collapse': {
		'background-image': 'window-collapse-hover.png'.toMifImg()
	},

	'pushbutton.window.collapse.hover.active': {
		'background-image': 'window-collapse-active.png'.toMifImg()
	},
	
	'pushbutton.window.tbar': {
		'background-image': 'window-tbar-button.png'.toMifImg(),
		'right': '2px',
		'top': '2px',
		'position': 'absolute',
		'width': '27px'
	},
	
	'pushbutton.window.tbar.hover.active': {
		'background-image': 'window-tbar-button-active.png'.toMifImg()
	},

	'pushbutton.window.tbar.hover': {
		'background-image': 'window-tbar-button-hover.png'.toMifImg()
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

/*
Mif.Layout.Sheet
*/

Mif.sheet.addRules({
	
	'layout': {
		'width': '100%',
		'height': '100%',
		'position': 'absolute',
		'display': 'block'
	},
	
	'layout > *': {
		'position': 'absolute',
		'display': 'block',
		'text-align': 'left'
	},
	
	'layout > left': {
		'top': '100px',
		'bottom': '100px',
		'left': '0',
		'width': '100px'
	},
	
	'layout > right': {
		'top': '100px',
		'bottom': '100px',
		'right': '0',
		'width': '100px'
	},
	
	'layout > center': {
		'top': '100px',
		'overflow': 'auto',
		'bottom': '100px',
		'right': '100px',
		'left': '100px'
	},
	
	'layout > top': {
		'width': '100%',
		'height': '100px',
		'left': '0',
		'top': '0',
		'z-index': '1'
	},
	
	'layout > bottom': {
		'width': '100%',
		'bottom': '0',
		'left': '0',
		'height': '100px',
		'z-index': '1'
	},
	
	'layout > handle': {
		'position': 'absolute',
		'display': 'block',
		'z-index': '2',
		'background': 'layout-border.png'.toMifImg(),
		'width': '6px',
		'height': '6px'
	},
	
	'layout > handle.left, layout > handle.right': {
		'cursor': (Browser.Engine.gecko ? 'ew-resize' : (Browser.Engine.webkit && Browser.Platform.mac ? 'col-resize' : 'w-resize')),
		'background-repeat': 'repeat-y',
		'background-position': 'top center',
		'height': 'auto'
	},
	
	'layout > handle.top, layout > handle.bottom': {
		'cursor': (Browser.Engine.gecko ? 'ns-resize' : (Browser.Engine.webkit && Browser.Platform.mac ? 'row-resize' : 'n-resize')),
		'background-repeat': 'repeat-x',
		'background-position': 'center center',
		'left': '0',
		'width': '100%'
	},
	
	'overlay': {
		'position': 'absolute',
		'left': '0',
		'top': '0',
		'width': '100%',
		'height': '100%',
		'background': 'transparent.gif'.toMifImg(),
		'z-index': '1000'
	}
	
});

if(Browser.Engine.presto){
	Mif.sheet.addRules({
		
		'layout > handle.right': {
			'cursor': 'e-resize'
		},
	
		'layout > handle.bottom': {
			'cursor': 's-resize'
		}
		
	});
}

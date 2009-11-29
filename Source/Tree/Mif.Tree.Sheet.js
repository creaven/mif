
Mif.sheet.addRules({
	'row, children, tree, node, wrapper': {
		'display': 'block'
	},

	'tree': {
		'position': 'relative',
		'width': '100%',
		'height': '100%',
		'min-height': Browser.Engine.trident5 ? '100%' : 'auto',
		'overflow': 'auto',
		'font-family': '"Lucida Grande", Helvetica, Arial, Verdana, sans-serif',
		'font-size': '12px',
		'color': '#000',
		'line-height': '18px',
		'white-space': 'nowrap',
		'cursor': 'default'
	},
	
	'tree wrapper': {
		'height': Browser.Engine.trident5 ? 'auto' : '100%',
		'min-height': Browser.Engine.trident5 ? '100%' : 'auto',
		'width': '100%',
		'overflow': 'visible',
		'display': 'table',
		'position': 'absolute',
		'background-image': 'zebra.png'.toMifImg()
	},

	'tree:focus': {
		'outline': '0'
	},

	'tree icon, tree toggle, tree checkbox, tree name': {
		'cursor': 'inherit',
		'display': 'inline-block',
		'height': '18px',
		'vertical-align': 'top'
	},
	
	'tree node': {
		'height': '18px'
	},

	'tree children': {
		'width': '100%',
		'display': 'none'
	},

	'tree children children node': {
		'padding-left': '36px'
	},

	'tree row': {
		'width': '100%',
		//'position': 'relative',
		'height': '18px'
	},

	'tree name': {
		'cursor': 'default',
		'overflow': 'hidden',
		'padding-left': '4px',
		'vertical-align': Browser.Engine.webkit ? 'middle' : 'top'
	},

	'tree icon': {
		'padding-right': '18px',
		'background-position': '0 50%',
		'background-repeat': 'no-repeat',
		'cursor': 'inherit'
	},
	
	'.mif-tree-open-icon': {
		'background-image': 'openicon.png'.toMifImg()
	},

	'.mif-tree-close-icon': {
		'background-image': 'closeicon.png'.toMifImg()
	},
	
	'tree row.hover name': {
		'text-decoration': 'underline'
	}
	
});

(function(){
	for(var i=1; i<30; i++){
		var rule='tree '+'children '.repeat(i)+'node';
		Mif.sheet.addRule(rule, 'padding-left: '+18*i+'px');
	}
})();


Mif.sheet.addRules({
	
	'tree toggle': {
		'padding-left': '16px',
		'z-index': '1',
		'overflow': 'hidden',
		'background-repeat': 'no-repeat',
		'cursor': 'default',
		'background-position': 'center center'
	},

	'toggle.none': {
		'visibility': 'hidden'
	},

	'.focus toggle.minus': {
		'background-image': 'down.png'.toMifImg()
	},

	'.focus toggle.plus': {
		'background-image': 'right.png'.toMifImg()
	},
	
	'.focus .selected toggle.plus': {
		'background-image': 'right-selected.png'.toMifImg()
	},

	'.focus .selected toggle.minus': {
		'background-image': 'down-selected.png'.toMifImg()
	},
	
	'.selected toggle.minus, toggle.minus': {
		'background-image': 'down-unfocused.png'.toMifImg()
	},

	'.selected toggle.plus, toggle.plus': {
		'background-image': 'right-unfocused.png'.toMifImg()
	},
	
	'toggle.plus.hover.active': {
		'background-image': 'right-active.png'.toMifImg()
	},

	'toggle.minus.hover.active': {
		'background-image': 'down-active.png'.toMifImg()
	},
	
	'.selected toggle.plus.hover.active': {
		'background-image': 'right-selected-active.png'.toMifImg()
	},

	'.selected toggle.minus.hover.active': {
		'background-image': 'down-selected-active.png'.toMifImg()
	}

});

/*
Mif.Tree.Selection
*/

Mif.sheet.addRules({
	
	'tree.focus row.selected': {
		'background-color': '#4891F3',
		'color': '#fff'
	},
	
	'tree row.selected': {
		'background-color': '#DEDEDE'
	}
	
});

Mif.Tree.implement({

	attachSelection: function(event){
		if(!['icon', 'name', 'node'].contains(this.mouse.target)) return;
		this.parent();
	}
	
});

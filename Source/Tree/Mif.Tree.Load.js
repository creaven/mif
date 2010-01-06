/*
Mif.Tree.Load
*/

Mif.sheet.addRules({
	
	'tree .loader-icon': {
		'background-image': 'loader.gif'.toMifImg()
	}
	
});

Mif.Tree.implement({

	load: function(options){
		this.storage.load(options);
		return this;
	}
	
});

Mif.Tree.Item.implement({
	
	load: function(options){
		var loader = this.loader||this.owner.loader;
		loader.load(this, options);
		return this;
	}
	
});

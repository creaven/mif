
Mif.Menu.Load={
		
	list: function(items, parentItem, list){
		for( var i=items.length; i--; ){
			var item=items[i];
			var subMenu=item.menu;
			var theItem=new Mif.Menu.Item({
				list: list
			});
			list.items.unshift(theItem);
			if(subMenu && subMenu.length){
				arguments.callee(subMenu, theItem, theItem.list);
			}
		}
		if(parentItem) parentItem.property.loaded=true;
		tree.fireEvent('loadChildren', parent);
	}
	
};

Mif.Menu.implement({
	
	load: function(options){
		return;
		this.$loading=true;
		options=options||{};
		//this.addType('loader');
		var self=this;
		function success(json){
			Mif.Menu.Load.list(json, null, self.list);
			delete self.$loading;
			//self.removeType('loader');
			Mif.Tree.Draw.update(self);
			return self.fireEvent('load');
		}
		options=$extend($extend($extend({
			isSuccess: $lambda(true),
			secure: true,
			onSuccess: success,
			method: 'get'
		}, this.loadOptions(this)), this.loadOptions), options);
		if(options.json) return success(options.json);
		new Request.JSON(options).send();
		return this;
	}
	
});

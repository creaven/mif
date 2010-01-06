/*
Mif.Tree.Item
*/


//loaded - internal store property

Mif.Tree.Item = new Class({

	Implements: [Mif.Component.Item],
	
	initialize: function(property, struct) {
		$extend(this, struct);
		this.children=[];
		this.defaults=$unlink(this.owner.defaults);
		this.UID=++Mif.UID;
		Mif.uids[this.UID]=this;
		var id=this.get('id');
		if(id!=null) Mif.ids[id]=this;
		this.owner.fireEvent('nodeCreate', [this]);
	},
	
	getToggleType: function(){
		return (this.get('loadable')  && !this.isLoaded()) ? 'plus' : (this.hasVisibleChildren() ? (this.isOpen() ? 'minus' : 'plus') : 'none');
	},
	
	toggle: function(state) {
		if(this.open==state) return this;
		if(!this.isOpen() && this.get('loadable') && !this.isLoaded() && !this.isLoading()) {
            this.load();
        }
		if(this.isLoaded() && !this.hasChildren()) return this;
		this.updateToggle();
		this.fireEvent('toggle', [this.open]);
		this.owner.fireEvent('toggle', [this, this.open]);
		return this;
	},
	
	updateToggle: function(){
		this.owner.$getIndex();
		this.owner.update(this);
		this.owner.updateHover();
	},
	
	recursive: function(fn, args){
		args=$splat(args);
		if(fn.apply(this, args)!==false){
			this.children.each(function(node){
				if(node.recursive(fn, args)===false){
					return false;
				}
			});
		}
		return this;
	},
	
	isOpen: function(){
		return this.open;
	},
	
	isLoaded: function(){
		return this.get('loaded');
	},
	
	isLoading: function(){
		return this.storage.loading;
	},
	
	isLast: function(){
		if(this.parentItem==null || this.parentItem.children.getLast()==this) return true;
		return false;
	},
	
	isFirst: function(){
		if(this.parentItem==null || this.parentItem.children[0]==this) return true;
		return false;
	},
	
	isRoot: function(){
		return this.parentItem==null ? true : false;
	},
	
	getChildren: function(){
		return this.children;
	},
	
	hasChildren: function(){
		return this.children.length ? true : false;
	},
	
	index: function(){
		if( this.isRoot() ) return 0;
		return this.parentItem.children.indexOf(this);
	},
	
	getNext: function(){
		if(this.isLast()) return null;
		return this.parentItem.children[this.index()+1];
	},
	
	getPrevious: function(){
		if( this.isFirst() ) return null;
		return this.parentItem.children[this.index()-1];
	},
	
	getFirst: function(){
		if(!this.hasChildren()) return null;
		return this.children[0];
	},
	
	getLast: function(){
		if(!this.hasChildren()) return null;
		return this.children.getLast();		
	},
	
	getParent: function(){
		return this.parentItem;
	},
	
	_getNextVisible: function(){
		var current=this;
		if(current.isRoot()){
			if(!current.isOpen() || !current.hasChildren()) return false;
			return current.getFirst();
		}else{
			if(current.isOpen() && current.getFirst()){
				return current.getFirst();
			}else{
				var parent=current;
				do{
					current=parent.getNext();
					if(current) return current;
				}while( parent=parent.parentItem );
				return false;
			}
		}
	},
	
	getPreviousVisible: function(){
		var index=this.owner.$index.indexOf(this);
		return index==0 ? null : this.owner.$index[index-1];
	},
	
	getNextVisible: function(){
		var index=this.owner.$index.indexOf(this);
		return index<this.owner.$index.length-1 ? this.owner.$index[index+1] : null;
	},
	
	getVisiblePosition: function(){
		return this.owner.$index.indexOf(this);
	},
	
	hasVisibleChildren: function(){
		if(!this.hasChildren()) return false;
		if(this.isOpen()){
			var next=this.getNextVisible();
			if(!next) return false;
			if(next.parentItem!=this) return false;
			return true;
		}else{
			var child=this.getFirst();
			while(child){
				if(!child.hidden) return true;
				child=child.getNext();
			}
			return false;
		}
	},
	
	isLastVisible: function(){
		var next=this.getNext();
		while(next){
			if(!next.hidden) return false;
			next=next.getNext();
		};
		return true;
	},
		
	contains: function(node){
		while(node){
			if(node==this) return true;
			node=node.parentItem;
		};
		return false;
	},
	
	get: function(property){
		return this.storage.property[property]
	},//TODO getMany, setMany
	
	set: function(property, value){
		if($type(property)=='object'){
			for(var p in property){
				this.set(p, property[p]);
			}
			return this;
		}
		this.owner.fireEvent('beforeSet', [this, property, value]);
		this.owner.storage.set(this.storage, property, value);
		
		//this.owner.fireEvent('set', [this, property, value]);
		return this;
	},
	
	updateProperty: function(p, currentValue, newValue){
		if(newValue==currentValue) return this;
		if(p=='id'){
			delete Mif.ids[currentValue];
			if(newValue) Mif.ids[newValue]=this;
			return this;
		}
		if(!this.owner.isUpdatable(this)) return this;
		switch(p){
			case 'name':
				this.getElement('name').set('html', newValue);
				return this;
			case 'cls':
				this.getElement('node').removeClass(currentValue).addClass(newValue);
				return this;
			case 'openIcon':
			case 'closeIcon':
				this.getElement('icon').removeClass(currentValue).addClass(newValue);//TODO add test
				return this;
			case 'hidden':
				this.getElement('row').setStyle('display', newValue ? 'none' : '');
				this.getElement('children').setStyle('display', newValue ? 'none' : 'block');
				var _previous=this.getPreviousVisible();
				var _next=this.getNextVisible();
				var parent=this.getParent();
				//this.property[p]=newValue;//TODO why?
				this.owner.$getIndex();
				var previous=this.getPreviousVisible();
				var next=this.getNextVisible();
				var tree=this.owner;
				[_previous, _next, previous, next, parent].each(function(node){
					tree.update(node);
				});
				return this;
		}
	}
	
});

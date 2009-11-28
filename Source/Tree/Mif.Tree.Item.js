/*
Mif.Tree.Item
*/

Mif.Tree.Item = new Class({

	Implements: [Events],
	
	initialize: function(property, struct) {
		$extend(this, struct);
		property=property||{};
		this.children=[];
		this.defaults=$unlink(this.owner.defaults);
		this.property=this.defaults;
		$extend(this.property, this.owner.types[property.type||'dflt']);
		this.property=$extend(this.property, property);
		this.UID=++Mif.UID;
		Mif.uids[this.UID]=this;
		var id=this.property.id;
		if(id!=null) Mif.ids[id]=this;
		this.owner.fireEvent('nodeCreate', [this]);
		this._property=['id', 'name', 'cls', 'openIcon', 'closeIcon', 'hidden'];
	},
	
	getToggleType: function(){
		return (this.property.loadable && !this.isLoaded()) ? 'plus' : (this.hasVisibleChildren() ? (this.isOpen() ? 'minus' : 'plus') : 'none');
	},
	
	toggle: function(state) {
		if(this.property.open==state || this.$loading) return this;
		var parent=this.getParent();
		function toggle(type){
			this.property.open = !this.property.open;
			if(type=='drawed'){
				this.drawToggle();
			}
			this.fireEvent('toggle', [this.property.open]);
			this.owner.fireEvent('toggle', [this, this.property.open]);
			return this;
		}
		if(this.property.loadable && !this.property.loaded) {
			this.property.open=true;
			this.fireEvent('toggle', [this.property.open]);
			this.owner.fireEvent('toggle', [this, this.property.open]);
            return this.load();
        }
		if(parent && !parent.$draw){
			return toggle.apply(this, []);
		}

		if(!this.hasChildren()) return this;
		return toggle.apply(this, ['drawed']);
	},
	
	drawToggle: function(){
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
		return this.property.open;
	},
	
	isLoaded: function(){
		return this.property.loaded;
	},
	
	isLast: function(){
		if(this.parentNode==null || this.parentNode.children.getLast()==this) return true;
		return false;
	},
	
	isFirst: function(){
		if(this.parentNode==null || this.parentNode.children[0]==this) return true;
		return false;
	},
	
	isRoot: function(){
		return this.parentNode==null ? true : false;
	},
	
	getChildren: function(){
		return this.children;
	},
	
	hasChildren: function(){
		return this.children.length ? true : false;
	},
	
	index: function(){
		if( this.isRoot() ) return 0;
		return this.parentNode.children.indexOf(this);
	},
	
	getNext: function(){
		if(this.isLast()) return null;
		return this.parentNode.children[this.index()+1];
	},
	
	getPrevious: function(){
		if( this.isFirst() ) return null;
		return this.parentNode.children[this.index()-1];
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
		return this.parentNode;
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
				}while( parent=parent.parentNode );
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
			if(next.parentNode!=this) return false;
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
			node=node.parentNode;
		};
		return false;
	},
	
	get: function(property){
		return this.property[property]
	},//TODO getMany, setMany
	
	set: function(property, value){
		if($type(property)=='object'){
			for(var p in property){
				this.set(p, property[p]);
			}
			return this;
		}
		this.owner.fireEvent('beforeSet', [this, property, value]);
		var nv=value;//new value
		var cv=this.property[property];//curent value
		this.updateProperty(property, cv, nv);
		this.property[property]=value;
		this.owner.fireEvent('set', [this, property, value]);
		return this;
	},
	
	updateProperty: function(p, cv, nv){
		if(nv==cv) return this;
		if(p=='id'){
			delete Mif.ids[cv];
			if(nv) Mif.ids[nv]=this;
			return this;
		}
		if(p=='type'){
			var current={};
			this._property.each(function(p){
				current[p]=this.property[p];
			}, this);
			$mix(this.property, this.owner.types[nv], this.defaults)
			this._property.each(function(p){
				this.updateProperty(p, current[p], this.property[p]);
			}, this);
			return this;
		}
		if(!this.owner.isUpdatable(this)) return this;
		switch(p){
			case 'name':
				this.getElement('name').set('html', nv);
				return this;
			case 'cls':
				this.getElement('node').removeClass(cv).addClass(nv);
				return this;
			case 'openIcon':
			case 'closeIcon':
				this.getElement('icon').removeClass(cv).addClass(nv);//TODO add test
				return this;
			case 'hidden':
				this.getElement('row').setStyle('display', nv ? 'none' : '');
				this.getElement('children').setStyle('display', nv ? 'none' : 'block');
				var _previous=this.getPreviousVisible();
				var _next=this.getNextVisible();
				var parent=this.getParent();
				//this.property[p]=nv;//TODO why?
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

/*
Mif.Tree.Node
*/
Mif.Tree.Node = new Class({

	Implements: [Events],
	
	initialize: function(structure, property) {
		$extend(this, structure);
		this.children=[];
		this.defaults=$unlink(this.tree.defaults);
		this.property=this.defaults;
		$extend(this.property, this.tree.types[property.type||'dflt']);
		this.property=$extend(this.property, property);
		this.UID=Mif.Tree.Node.UID++;
		Mif.Tree.Nodes[this.UID]=this;
		var id=this.property.id;
		if(id!=null) Mif.ids[id]=this;
		this.tree.fireEvent('nodeCreate', [this]);
		this._property=['id', 'name', 'cls', 'openIcon', 'closeIcon', 'openIconUrl', 'closeIconUrl', 'hidden'];
	},
	
	getDOM: function(what){
		var node=$('mif-tree-node-'+this.UID);
		if(what=='node') return node;
		var wrapper=node.getFirst();
		if(what=='wrapper') return wrapper;
		if(what=='children') return wrapper.getNext();
		return wrapper.getElement('.mif-tree-'+what);
	},
	
	getGadjetType: function(){
		return (this.property.loadable && !this.isLoaded()) ? 'plus' : (this.hasVisibleChildren() ? (this.isOpen() ? 'minus' : 'plus') : 'none');
	},
	
	toggle: function(state) {
		if(this.property.open==state || this.$loading || this.$toggling) return this;
		var parent=this.getParent();
		function toggle(type){
			this.property.open = !this.property.open;
			if(type=='drawed'){
				this.drawToggle();
			}else{
				parent._toggle=(parent._toggle||[])[this.property.open ? 'include' : 'erase'](this)
			}
			this.fireEvent('toggle', [this.property.open]);
			this.tree.fireEvent('toggle', [this, this.property.open]);
			return this;
		}
		if(parent && !parent.$draw){
			return toggle.apply(this, []);
		}
		if(this.property.loadable && !this.property.loaded) {
            if(!this.load_event){
                this.load_event=true;
                this.addEvent('load',function(){
                    this.toggle();
                }.bind(this));
            }
            return this.load();
        }
		if(!this.hasChildren()) return this;
		return toggle.apply(this, ['drawed']);
	},
	
	drawToggle: function(){
		this.tree.$getIndex();
		Mif.Tree.Draw.update(this);
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
			if(!current.isOpen() || !current.hasChildren(true)) return false;
			return current.getFirst(true);
		}else{
			if(current.isOpen() && current.getFirst(true)){
				return current.getFirst(true);
			}else{
				var parent=current;
				do{
					current=parent.getNext(true);
					if(current) return current;
				}while( parent=parent.parentNode );
				return false;
			}
		}
	},
	
	getPreviousVisible: function(){
		var index=this.tree.$index.indexOf(this);
		return index==0 ? null : this.tree.$index[index-1];
	},
	
	getNextVisible: function(){
		var index=this.tree.$index.indexOf(this);
		return index<this.tree.$index.length-1 ? this.tree.$index[index+1] : null;
	},
	
	getVisiblePosition: function(){
		return this.tree.$index.indexOf(this);
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
		this.tree.fireEvent('beforeSet', [this, property, value]);
		var nv=value;//new value
		var cv=this.property[property];//curent value
		this.updateProperty(property, cv, nv);
		this.property[property]=value;
		this.tree.fireEvent('set', [this, property, value]);
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
			$mix(this.property, this.tree.types[nv], this.defaults)
			this._property.each(function(p){
				this.updateProperty(p, current[p], this.property[p]);
			}, this);
			return this;
		}
		if(!Mif.Tree.Draw.isUpdatable(this)) return this;
		switch(p){
			case 'name':
				this.getDOM('name').set('html', nv);
				return this;
			case 'cls':
				this.getDOM('wrapper').removeClass(cv).addClass(nv);
				return this;
			case 'openIcon':
			case 'closeIcon':
				this.getDOM('icon').removeClass(cv).addClass(nv);
				return this;
			case 'openIconUrl':
			case 'closeIconUrl':
				var icon=this.getDOM('icon');
				icon.setStyle('background-image', 'none');
				if(nv) icon.setStyle('background-image', 'url('+nv+')');
				return this;
			case 'hidden':
				this.getDOM('node').setStyle('display', nv ? 'none' : 'block');
				var _previous=this.getPreviousVisible();
				var _next=this.getNextVisible();
				var parent=this.getParent();
				this.property[p]=nv;//TODO why?
				this.tree.$getIndex();
				var previous=this.getPreviousVisible();
				var next=this.getNextVisible();
				[_previous, _next, previous, next, parent].each(function(node){
					Mif.Tree.Draw.update(node);
				});
				return this;
		}
	},
	
	updateOpenState: function(){//TODO merge updateOpenState and _toggle
		if(this.property.open){
			this.property.open=false;
			this.toggle();
		}
	}
	
});

Mif.Tree.Node.UID=0;
Mif.Tree.Nodes={};
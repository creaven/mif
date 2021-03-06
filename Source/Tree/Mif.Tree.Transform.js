/*
Mif.Tree.Transform
*/

Mif.Tree.Item.implement({
	
	inject: function(node, where, element){//element - internal property
		where=where||'inside';
		var parent=this.parentItem;
		function getPreviousVisible(node){
			var previous=node;
			while(previous){
				previous=previous.getPrevious();
				if(!previous) return null;
				if(!previous.property.hidden) return previous;
			}
		}
		var previousVisible=getPreviousVisible(this);
		var type=element ? 'copy' : 'move';
		switch(where){
			case 'after':
			case 'before':
				if( node['get'+(where=='after' ? 'Next' : 'Previous')]()==this ) return false;
				if(this.parentItem) {
					this.parentItem.children.erase(this);
				}
				this.parentItem=node.parentItem;
				this.parentItem.children.inject(this, node, where);
				break;
			case 'inside':
				if( node.owner && node.getLast()==this ) return false;
				if(this.parentItem) {
					this.parentItem.children.erase(this);
				}
				if(node.owner){
					if(!node.hasChildren()){
						node.$draw=true;
						node.property.open=true;
					}
					node.children.push(this);
					this.parentItem=node;
				}else{
					node.root=this;
					this.parentItem=null;
					node.fireEvent('drawRoot');
				}
				break;
		}
		var tree=node.owner||node;
		if(this==this.owner.root){
			this.owner.root=false;
		}
		if(this.owner!=tree){
			var oldTree=this.owner;
			this.recursive(function(){
				this.owner=tree;
			});
		};
		tree.fireEvent('structureChange', [this, node, where, type]);
		tree.$getIndex();
		if(oldTree)	oldTree.$getIndex();
		tree.updateInject(this, element);
		[node, this, parent, previousVisible, getPreviousVisible(this)].each(function(node){
			tree.update(node);
		});
		return this;
	},
	
	copy: function(node, where, nounlink){
		if (this.property.copyDenied) return;
		function copy(structure){
			var node=structure.node;
			var tree=structure.tree;
			var property;
			if(!nounlink){//TODO change
				property=$unlink(node.property);
			}else{
				property = node.property;
			}
			property.open=false;//TODO for why?
			var nodeCopy = new Mif.Tree.Item({
				parentItem: structure.parentItem,
				children: [],
				tree: tree
			}, property);
			node.children.each(function(child){
				var childCopy=copy({
					node: child,
					parentItem: nodeCopy,
					tree: tree
				});
				nodeCopy.children.push(childCopy);
			});
			return nodeCopy;
		};
		
		var nodeCopy=copy({
			node: this,
			parentItem: null,
			tree: node.owner
		});
		return nodeCopy.inject(node, where, node.owner.drawNode(nodeCopy));
	},
	
	remove: function(){
		if (this.property.removeDenied) return;
		var tree=this.owner;
		tree.fireEvent('remove', [this]);
		var parent=this.parentItem, previousVisible=this.getPreviousVisible();
		if(parent) {	
			parent.children.erase(this);
		}else if(!tree.forest){
			tree.root=null;
		}
		tree.selected=false;
		this.getElement().destroy();
		tree.$getIndex();
		tree.update(parent);
		tree.update(previousVisible);
		this.recursive(function(){
			if(this.property.id) delete Mif.ids[this.property.id];
		});
		tree.mouse.item=false;
		tree.updateHover();
	}
	
});


Mif.Tree.implement({

	move: function(from, to, where){
		if(from.inject(to, where)){
			this.fireEvent('move', [from, to, where]);
		}
		return from;
	},
	
	copy: function(from, to, where){
		var copy=from.copy(to, where);
		if(copy){
			this.fireEvent('copy', [from, to, where, copy]);
		}
		return copy;
	},
	
	remove: function(node){
		node.remove();
		return this;
	},
	
	add: function(node, current, where){
		if(!(node instanceof Mif.Tree.Item)){
			node=new Mif.Tree.Item(node, {
				parentItem: null,
				owner: this
			});
		};
		node.inject(current, where, this.drawNode(node));
		this.fireEvent('add', [node, current, where]);
		return this;
	}
	
});

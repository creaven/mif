/*
Mif.Tree.Transform
*/

Mif.Tree.Item.implement({
	
	inject: function(node, where, element){//element - internal property
		where=where||'inside';
		var parent=this.parentNode;
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
				if(this.parentNode) {
					this.parentNode.children.erase(this);
				}
				this.parentNode=node.parentNode;
				this.parentNode.children.inject(this, node, where);
				break;
			case 'inside':
				if( node.owner && node.getLast()==this ) return false;
				if(this.parentNode) {
					this.parentNode.children.erase(this);
				}
				if(node.owner){
					if(!node.hasChildren()){
						node.$draw=true;
						node.property.open=true;
					}
					node.children.push(this);
					this.parentNode=node;
				}else{
					node.root=this;
					this.parentNode=null;
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
		Mif.Tree.Draw.inject(this, element);
		[node, this, parent, previousVisible, getPreviousVisible(this)].each(function(node){
			Mif.Tree.Draw.update(node);
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
				parentNode: structure.parentNode,
				children: [],
				tree: tree
			}, property);
			node.children.each(function(child){
				var childCopy=copy({
					node: child,
					parentNode: nodeCopy,
					tree: tree
				});
				nodeCopy.children.push(childCopy);
			});
			return nodeCopy;
		};
		
		var nodeCopy=copy({
			node: this,
			parentNode: null,
			tree: node.owner
		});
		return nodeCopy.inject(node, where, Mif.Tree.Draw.node(nodeCopy));
	},
	
	remove: function(){
		if (this.property.removeDenied) return;
		this.owner.fireEvent('remove', [this]);
		var parent=this.parentNode, previousVisible=this.getPreviousVisible();
		if(parent) {	
			parent.children.erase(this);
		}else if(!this.owner.forest){
			this.owner.root=null;
		}
		this.owner.selected=false;
		this.getElement().destroy();
		this.owner.$getIndex();
		Mif.Tree.Draw.update(parent);
		Mif.Tree.Draw.update(previousVisible);
		this.recursive(function(){
			if(this.property.id) delete Mif.ids[this.property.id];
		});
		this.owner.mouse.item=false;
		this.owner.updateHover();
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
				parentNode: null,
				owner: this
			});
		};
		node.inject(current, where, Mif.Tree.Draw.node(node));
		this.fireEvent('add', [node, current, where]);
		return this;
	}
	
});

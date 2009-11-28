/*
Mif.Tree.Draw
*/

Mif.Tree.implement({

	getHTML: function(node, html){
		if($defined(node.property.checked)){
			if(!node.property.hasCheckbox) node.property.checked='nochecked';
			var checkbox='<checkbox class="mif-tree-node-'+node.property.checked+'"></checkbox>';
		}else{
			var checkbox='';
		}
		html=html||[];
		html.push(
		'<row class="',node.property.cls,(node.property.selected ? ' selected' : ''),'" ',(node.property.hidden ? ' style="display:none"' : ''),' uid="'+node.UID+'" id="mif-tree-node-',node.UID,'">',
			'<node>',
				'<toggle class="',node.getToggleType(),'"></toggle>',
				checkbox,
				'<icon class="',node.property.closeIcon,'"></icon>',
				'<name>',node.property.name,'</name>',
			'</node>',
		'</row>',
		'<children></children>'
		);
		return html;
	},
	
	drawChildren: function(parent, container){
		parent.open=true;
		parent.$draw=true;
		var html=[];
		var children=parent.children;
		for(var i=0, l=children.length; i<l; i++){
			this.getHTML(children[i],html);
		}
		container=container || parent.getElement('children');
		container.set('html', html.join(''));
		parent.owner.fireEvent('drawChildren',[parent]);
	},
	
	drawRoot: function(){
		var domRoot=this.drawNode(this.root);
		domRoot.injectInside(this.wrapper);
		this.$draw=true;
		return this.fireEvent('drawRoot');
	},
	
	drawForestRoot: function(){
		var container=new Element('root').addClass('mif-tree-children-root').inject(this.wrapper);
		this.drawChildren(this.root, container);
	},
	
	drawNode: function(node){
		return new Element('div').inject(document.body).set('html', this.getHTML(node).join('')).dispose().getChildren();
	},
	
	isUpdatable: function(node){
		if(
			(!node||!node.owner) ||
			(node.getParent() && !node.getParent().$draw) || 
			(node.isRoot() && (!this.$draw||this.forest)) 
		) return false;
		return true;
	},
	
	update: function(node){
		if(!this.isUpdatable(node)) return;
		if(!node.hasChildren()) node.property.open=false;
		node.getElement('toggle').className=node.getToggleType();
		node.getElement('icon').className=node.property[node.isOpen() ? 'openIcon' : 'closeIcon'];
		if(node.$loading) return;
		var children=node.getElement('children');
		if(node.isOpen()){
			if(!node.$draw) {
				this.drawChildren(node);
				this.$getIndex();
				node.getElement('toggle').className=node.getToggleType();
				this.updateHover();
			}
			children.style.display=node.property.hidden ? 'none' : 'block';
		}else{
			children.style.display='none';
		}
		this.fireEvent('updateNode', node);
		return node;
	},
	
	updateInject: function(node, element){
		if(!this.isUpdatable(node)) return;
		element=element||node.getElement()||this.drawNode(node);
		var previous=node.getPrevious();
		if(previous){
			new Elements([element[1], element[0]]).inject(previous.getElement('children'), 'after');
			return;
		}
		var container;
		if(this.forest && node.parentNode.isRoot()){
			container=this.wrapper.getElement('root');
		}else if(node==this.root){
			container=this.wrapper;
		}else{
			container=node.parentNode.getElement('children');
		}
		new Elements([element[1], element[0]]).inject(container, 'top');
	}
	
});


Mif.Tree.Item.implement({
	
	getElement: function(type){//TODO rename node->row etc
		var node=document.id('mif-tree-node-'+this.UID);
		if(!node) return false;
		if(!type){
			return new Elements([node, node.getNext()]);
		}
		if(type=='row') return node;
		if(type=='children') return node.getNext();
		return node.getElement(type);
	}
	
});

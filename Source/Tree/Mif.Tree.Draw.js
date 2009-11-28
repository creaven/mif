/*
Mif.Tree.Draw
*/

Mif.Tree.Draw={

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
	
	children: function(parent, container){
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
	
	root: function(tree){
		var domRoot=this.node(tree.root);
		domRoot.injectInside(tree.wrapper);
		tree.$draw=true;
		tree.fireEvent('drawRoot');
	},
	
	forestRoot: function(tree){
		var container=new Element('root').addClass('mif-tree-children-root').inject(tree.wrapper);
		Mif.Tree.Draw.children(tree.root, container);
	},
	
	node: function(node){
		return new Element('div').inject(document.body).set('html', this.getHTML(node).join('')).dispose().getChildren();
	},
	
	isUpdatable: function(node){
		if(
			(!node||!node.owner) ||
			(node.getParent() && !node.getParent().$draw) || 
			(node.isRoot() && (!node.owner.$draw||node.owner.forest)) 
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
				Mif.Tree.Draw.children(node);
				node.owner.$getIndex();
				node.getElement('toggle').className=node.getToggleType();
				node.owner.updateHover();
			}
			children.style.display=node.property.hidden ? 'none' : 'block';
		}else{
			children.style.display='none';
		}
		node.owner.fireEvent('updateNode', node);
		return node;
	},
	
	inject: function(node, element){
		if(!this.isUpdatable(node)) return;
		element=element||node.getElement()||this.node(node);
		var previous=node.getPrevious();
		if(previous){
			new Elements([element[1], element[0]]).inject(previous.getElement('children'), 'after');
			return;
		}
		var container;
		if(node.owner.forest && node.parentNode.isRoot()){
			container=node.owner.wrapper.getElement('root');
		}else if(node==node.owner.root){
			container=node.owner.wrapper;
		}else{
			container=node.parentNode.getElement('children');
		}
		new Elements([element[1], element[0]]).inject(container, 'top');
	}
	
};

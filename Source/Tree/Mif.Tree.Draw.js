/*
Mif.Tree.Draw
*/

Mif.Tree.Draw={

	getHTML: function(node, html){
		var prefix='mif-tree-node-';
		if($defined(node.property.checked)){
			if(!node.property.hasCheckbox) node.property.checked='nochecked';
			var checkbox='<checkbox class="mif-tree-node-'+node.property.checked+'" uid="'+node.UID+'"></checkbox>';
		}else{
			var checkbox='';
		}
		html=html||[];
		html.push(
		'<row class="',(node.isLast() ? 'mif-tree-node-last' : ''),'"'+(node.hidden ? ' style="display:none"' : '')+' id="',prefix,node.UID,'">',
			'<node class="',node.property.cls,(node.property.selected ? ' mif-tree-node-selected' : ''),'" uid="',node.UID,'">',
				'<gadget class="',node.getGadgetType(),'" uid="',node.UID,'"></gadget>',
				checkbox,
				'<icon class="',node.property.closeIcon,'" uid="',node.UID,'"></icon>',
				'<name uid="',node.UID,'">',node.property.name,'</name>',
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
		container=container || parent.getDOM('children');
		container.set('html', html.join(''));
		parent.tree.fireEvent('drawChildren',[parent]);
	},
	
	root: function(tree){
		var domRoot=this.node(tree.root);
		domRoot.injectInside(tree.wrapper);
		tree.$draw=true;
		tree.fireEvent('drawRoot');
	},
	
	forestRoot: function(tree){
		var container=new Element('root').addClass('mif-tree-children-root').injectInside(tree.wrapper);
		Mif.Tree.Draw.children(tree.root, container);
	},
	
	node: function(node){
		return new Element('div').inject(document.body).set('html', this.getHTML(node).join('')).dispose().getChildren();
	},
	
	isUpdatable: function(node){
		if(
			(!node||!node.tree) ||
			(node.getParent() && !node.getParent().$draw) || 
			(node.isRoot() && (!node.tree.$draw||node.tree.forest)) 
		) return false;
		return true;
	},
	
	update: function(node){
		if(!this.isUpdatable(node)) return;
		if(!node.hasChildren()) node.property.open=false;
		node.getDOM('gadget').className=node.getGadgetType();
		node.getDOM('icon').className=node.property[node.isOpen() ? 'openIcon' : 'closeIcon'];
		node.getDOM('node')[(node.isLastVisible() ?'add' : 'remove')+'Class']('mif-tree-node-last');
		if(node.$loading) return;
		var children=node.getDOM('children');
		if(node.isOpen()){
			if(!node.$draw) {
				Mif.Tree.Draw.children(node);
				node.tree.$getIndex();
				node.getDOM('gadget').className=node.getGadgetType();
				
			}
			children.style.display='block';
		}else{
			children.style.display='none';
		}
		node.tree.fireEvent('updateNode', node);
		return node;
	},
	
	inject: function(node, element){
		if(!this.isUpdatable(node)) return;
		element=element||node.getDOM('node')||this.node(node);
		var previous=node.getPrevious();
		if(previous){
			element.injectAfter(previous.getDOM('node'));
			return;
		}
		var container;
		if(node.tree.forest && node.parentNode.isRoot()){
			container=node.tree.wrapper.getElement('.mif-tree-children-root');
		}else if(node.tree.root==node){
			container=node.tree.wrapper;
		}else{
			container=node.parentNode.getDOM('children');
		}
		element.injectTop(container);
	}
	
};

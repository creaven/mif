/*
Mif.Tree.Hover
*/
Mif.Tree.implement({
	
	initHover: function(){
		this.bound.hover=this.hover.bind(this);
		this.wrapper.addEvent('mouseover', this.bound.hover);
		this.wrapper.addEvent('mouseout', this.bound.hover);
		this.hovered=[];
	},
	
	hover: function(){
		var targetNode=this.mouse.node;
		var targetElement=this.mouse.element;
		var exists=[];
		for(var i=0, l=this.hovered.length; i<l; i++){
			var item=this.hovered[i];
			var node=item.node;
			var element=item.element;
			if(!targetElement || (node!=targetNode)){
				this.hoverOverOut(node, element, 'out');
				this.hovered.splice(i, 1);
				i--;
				l--;
				continue;
			}
			if(!element.hasChild(targetElement)){
				this.hoverOverOut(node, element, 'out');
				this.hovered.splice(i, 1);
				i--;
				l--;
			}else{
				exists.push(element);
			}
		}
		if(targetNode&&targetElement){
			if(!targetElement||!targetElement.getParent('row')) return;
			var parent=targetElement;
			do{
				if(!exists.contains(parent)){
					this.hovered.push({node: targetNode, element: parent});
					this.hoverOverOut(targetNode, parent, 'over');
				}
				if(parent.tagName.toLowerCase()=='row') break;
				parent=parent.parentNode;
			}while(1);
		}
	},
	
	hoverOverOut: function(node, element, state){
		node.hover(element, state);
		this.fireEvent('hover', [node, element, state]);
	},
	
	updateHover: function(){
		while(this.hovered.length){
			var item=this.hovered[0];
			this.hoverOverOut(item.node, item.element, 'out');
			this.hovered.splice(0, 1);
		}
		this.hover();
	}
	
});

Mif.Tree.Node.implement({
	
	hover: function(element, state){
		//console.log(element);
		if(!element) return;
		element[(state=='over' ? 'add' : 'remove')+'Class']('hover');
	}
	
});

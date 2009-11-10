/*
Mif.Tree.Checkbox
*/

Mif.sheet.addRules({
	
	'tree checkbox': {
		'padding-left': '18px',
		'background-image': 'checkboxes.gif'.toMifImg(),
		'background-repeat': 'no-repeat'
	},

	'.mif-tree-node-checked': {
		'background-position': '0px center'
	},

	'.mif-tree-node-unchecked': {
		'background-position': '-18px center'
	},

	'.mif-tree-node-nochecked': {
		'background-position': '-108px center'
	},

	'.mif-tree-hover-checkbox .mif-tree-node-checked': {
		'background-position': '-36px center'
	},

	'.mif-tree-hover-checkbox .mif-tree-node-unchecked': {
		'background-position': '-54px center'
	},

	'.mif-tree-node-partially': {
		'background-position': '-72px center'
	},

	'.mif-tree-hover-checkbox .mif-tree-node-partially': {
		'background-position': '-90px center'
	}
	
})

Mif.Tree.implement({

	initCheckbox: function(type){
		this.checkboxType=type||'simple';
		this.defaults.checked='unchecked';
		this.defaults.hasCheckbox=true;
		this.wrapper.addEvent('click',this.checkboxClick.bind(this));
		if(this.checkboxType=='simple') return;
		this.addEvent('load', function(node){
			if(!node || node.property.checked=='unchecked') return;
			node.recursive(function(){
				this.property.checked='checked';
			});
		});
	},
	
	checkboxClick: function(event){
		if(this.mouse.target!='checkbox') {return;}
		this.mouse.node['switch']();
	},
	
	getChecked: function(includePartially){
		var checked=[];
		this.root.recursive(function(){
			var condition = includePartially ? this.property.checked!=='unchecked' : this.property.checked=='checked';
			if(this.hasCheckbox && condition) checked.push(this);
		});
		return checked;
	}

});

Mif.Tree.Node.implement({

	'switch' : function(state){
		if(this.property.checked==state||!this.property.hasCheckbox) return;
		var type=this.tree.checkboxType;
		var checked=(this.property.checked=='checked') ? 'unchecked' : 'checked';
		this.tree.fireEvent(checked=='checked' ? 'check' : 'unCheck', this);
		this.tree.fireEvent('switch', [this, (checked=='checked' ? true : false)]);
		var setState=function(node, state){
			if(!node.property.hasCheckbox) return;
			var oldState=node.property.checked;
			node.property.checked=state;
			if((!node.parentNode&&node.tree.$draw) || (node.parentNode && node.parentNode.$draw)){
				node.getElement('checkbox').removeClass('mif-tree-node-'+oldState).addClass('mif-tree-node-'+state);
			}
		};
		if(type=='simple'){
			setState(this, checked);
			return false;
		};
		this.recursive(function(){
			setState(this, checked);
		});
		function setParentCheckbox(node){
			if(!node.property.hasCheckbox) return;
			if(!node.parentNode || (node.tree.forest && !node.parentNode.parentNode)) return;
			var parent=node.parentNode;
			var state='';
			var children=parent.children;
			for(var i=children.length; i--; i>0){
				var child=children[i];
				if(!child.property.hasCheckbox) continue;
				var childState=child.property.checked;
				if(childState=='partially'){
					state='partially';
					break;
				}else if(childState=='checked'){
					if(state=='unchecked'){
						state='partially';
						break;
					}
					state='checked';
				}else{
					if(state=='checked'){
						state='partially';
						break;
					}else{
						state='unchecked';
					}
				}
			}
			if(parent.property.checked==state){return;};
			setState(parent, state);
			setParentCheckbox(parent);
		};
		setParentCheckbox(this);
	}

});

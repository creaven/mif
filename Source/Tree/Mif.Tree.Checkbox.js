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
		this.mouse.item['switch']();
	},
	
	getChecked: function(includePartially){
		var checked=[];
		this.root.recursive(function(){
			var condition = includePartially ? this.property.checked!=='unchecked' : this.property.checked=='checked';
			if(this.property.hasCheckbox && condition) checked.push(this);
		});
		return checked;
	}

});

Mif.Tree.Item.implement({

	'switch' : function(state){
		if(this.property.checked==state||!this.property.hasCheckbox) return;
		var type=this.owner.checkboxType;
		var checked=(this.property.checked=='checked') ? 'unchecked' : 'checked';
		var setState=function(node, state){
			if(!node.property.hasCheckbox) return;
			var oldState=node.property.checked;
			node.property.checked=state;
			if((!node.parentItem&&node.owner.$draw) || (node.parentItem && node.parentItem.$draw)){
				node.getElement('checkbox').removeClass('mif-tree-node-'+oldState).addClass('mif-tree-node-'+state);
			}
		};
		if(type=='simple'){
			setState(this, checked);
			this.owner.fireEvent(checked=='checked' ? 'check' : 'unCheck', this);
			this.owner.fireEvent('switch', [this, (checked=='checked' ? true : false)]);
			return this;
		};
		this.recursive(function(){
			setState(this, checked);
		});
		function setParentCheckbox(node){
			if(!node.property.hasCheckbox) return;
			if(!node.parentItem || (node.owner.forest && !node.parentItem.parentItem)) return;
			var parent=node.parentItem;
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
		return this;
	}

});

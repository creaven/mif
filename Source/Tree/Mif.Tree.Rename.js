/*
Mif.Tree.Rename
*/

Mif.sheet.addRules({
	
	'tree .rename': {
		'display': 'inline',
		'line-height': '14px',
		'height': '14px',
		'cursor': 'default',
		'overflow': 'hidden',
		'font-family': 'sans-serif',
		'font-size': '11px',
		'padding': '1px 0',
		'border': 'solid 1px black'
	}
	
});

Mif.Tree.implement({
	
	attachRenameEvents: function(){
		this.wrapper.addEvents({
			click: function(event){
				if($(event.target).get('tag')=='input') return;
				this.beforeRenameComplete();
			}.bind(this),
			keydown: function(event){
				if(event.key=='enter'){
					this.beforeRenameComplete();
				}
				if(event.key=='esc'){
					this.renameCancel();
				}
			}.bind(this)
		});
	},
	
	disableEvents: function(){
		if(!this.eventStorage) this.eventStorage=new Element('div');
		this.eventStorage.cloneEvents(this.wrapper);
		this.wrapper.removeEvents();
	},
	
	enableEvents: function(){
		this.wrapper.removeEvents();
		this.wrapper.cloneEvents(this.eventStorage);
	},
	
	getInput: function(){
		if(!this.input){
			this.input=new Element('input').addClass('rename');
			this.input.addEvent('focus',function(){this.select()});
			Mif.Tree.Rename.autoExpand(this.input);
		}
		return this.input;
	},
	
	startRename: function(node){
		this.unselect();
		this.disableEvents();
		this.attachRenameEvents();
		var input=this.getInput();
		input.value=node.property.name;
		this.renameName=node.getElement('name');
		this.renameNode=node;
		input.setStyle('width', this.renameName.offsetWidth+15);
		input.replaces(this.renameName);
		input.focus();
	},
	
	finishRename: function(){
		this.renameName.replaces(this.getInput());
	},
	
	beforeRenameComplete: function(){
		if(this.options.beforeRename){
			var newName=this.getInput().value;
			var node=this.renameNode;
			this.options.beforeRename.apply(this, [node, node.property.name, newName]);
		}else{
			this.renameComplete();
		}
	},
		
	renameComplete: function(){
		this.enableEvents();
		this.finishRename();
		var node=this.renameNode;
		var oldName=node.property.name;
		node.set({
			name: this.getInput().value
		});
		this.fireEvent('rename', [node, node.property.name, oldName]);
		this.select(node);
	},
	
	renameCancel: function(){
		this.enableEvents();
		this.finishRename();
		this.select(this.renameNode);
	}
	
});

Mif.Tree.Node.implement({
	
	rename: function(){
		if (this.property.renameDenied) return;
		this.tree.startRename(this);
	}
	
});

Mif.Tree.Rename={
	
	autoExpand: function(input){
		var span=new Element('span').addClass('mif-tree-rename').setStyles({
			position: 'absolute',
			left: -2000,
			top:0,
			padding: 0
		}).injectInside(document.body);
		input.addEvent('keydown',function(event){
			(function(){
			input.setStyle('width',Math.max(20, span.set('html', input.value.replace(/\s/g,'&nbsp;')).offsetWidth+15));
			}).delay(10);
		});
	}
	
};

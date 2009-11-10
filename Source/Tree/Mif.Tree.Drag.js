/*
Mif.Tree.Drag
*/

Mif.sheet.addRules({
	
	'tree pointer': {
		'display': 'block',
		'height': '1px',
		'overflow': 'hidden',
		'position': 'absolute',
		'background-image': '1.gif'.toMifImg(),
		'background-repeat': 'repeat-x',
		'background-color': '#292fef'
	},
	
	'ghost, ghost *': {
		'display': 'inline'
	},

	'ghost': {
		'background-color': '#fff',
		'border': 'solid 1px #e8e8f7',
		'padding-left': '2px',
		'position': 'absolute',
		'display': 'inline',
		'white-space': 'nowrap'
	},
	
	'ghost *': {
		'display': 'inline-block',
		'height': '18px',
		'line-height': '18px',
		'vertical-align': 'middle'
	},

	'ghost icon': {
		'width': '16px',
		'background-repeat': 'no-repeat',
		'background-position': 'center center'
	},
	
	'ghost indicator': {
		'background': 'center center no-repeat',
		'width': '16px'
	},

	'ghost .after': {
		'background-image': 'drop-after.png'.toMifImg()
	},

	'ghost .before': {
		'background-image': 'drop-before.png'.toMifImg()
	},

	'ghost .between': {
		'background-image': 'drop-between.png'.toMifImg()
	},

	'ghost .inside': {
		'background-image': 'drop-inside.gif'.toMifImg()//TODO gif->png
	},

	'ghost .notAllowed': {
		'background-image': 'drop-notAllowed.gif'.toMifImg()
	},

	'.mif-tree-drag-current': {
		'background-color': '#cfcfd8'
	},

	'.mif-tree-replace': {
		'background-color': '#99c8fb'
	}
	
});

Mif.Tree.Drag = new Class({
	
	Implements: [new Events, new Options],
	
	Extends: Drag,
	
	options:{
		group: 'tree',
		droppables: [],
		snap: 4,
		animate: true,
		open: 600,//time to open node
		scrollDelay: 100,
		scrollSpeed: 100,
		modifier: Browser.Platform.mac ? 'alt' : 'control',//copy
		startPlace: ['icon', 'name'],
		allowContainerDrop: true
	},

	initialize: function(tree, options){
		tree.drag=this;
		this.setOptions(options);
		$extend(this,{
			tree: tree,
			handles: tree,
			snap: this.options.snap,
			groups: [],
			droppables: [],
			action: this.options.action
		});
		this.addToGroups(this.options.group);
		this.setDroppables(this.options.droppables);
		$extend(tree.defaults, {
			dropDenied: [],
			dragDisabled: false
		});
		this.document = tree.wrapper.getDocument();
		tree.addEvent('drawRoot',function(){//TODO should be rootCreate event
			tree.root.property.dropDenied.combine(['before', 'after']);
		});
		this.pointer=new Element('pointer').inject(tree.element);
		this.current=Mif.Tree.Drag.current;
		this.target=Mif.Tree.Drag.target;
		this.where=Mif.Tree.Drag.where;
		this.element=[this.current, this.target, this.where];
		this.selection = (Browser.Engine.trident) ? 'selectstart' : 'mousedown';
		this.bound = {
			start: this.start.bind(this),
			check: this.check.bind(this),
			drag: this.drag.bind(this),
			stop: this.stop.bind(this),
			cancel: this.cancel.bind(this),
			eventStop: $lambda(false),
			leave: this.leave.bind(this),
			enter: this.enter.bind(this),
			stopOnEscape: this.stopOnEscape.bind(this),
			onStart: this.onStart.bind(this),
			onComplete: this.onComplete.bind(this)
		};
		this.attach();
		
		this.addEvent('start', this.bound.onStart);
		this.addEvent('complete', this.bound.onComplete);
	},
	
	getElement: function(){
		return this.tree.wrapper;
	},
	
	start: function(event){
		var target=this.tree.mouse.target;
		if(!target) return;
		this.current=$splat(this.options.startPlace).contains(target) ? this.tree.mouse.node : false;
		if(!this.current || this.current.property.dragDisabled) return;
		this.fireEvent('beforeStart', this.element);
		Mif.Tree.Drag.current=this.current;
		Mif.Tree.Drag.startZone=this;
		this.mouse={
			start: event.page
		};
		document.addEvents({
			mousemove: this.bound.check, 
			mouseup: this.bound.cancel
		});
		document.addEvent(this.selection, this.bound.eventStop);
	},
	
	onStartOrComplete: function(what){
		document[(what == 'start' ? 'add' : 'remove') + 'Event']('keydown', this.bound.stopOnEscape);
		this.droppables.each(function(item){
			item.getElement()[(what == 'start' ? 'add' : 'remove') + 'Event']({
				mouseleave: this.bound.leave, 
				mouseenter: this.bound.enter
			});
		}, this);
		Mif.Tree.Drag.current.getDOM('name')[(what == 'start' ? 'add' : 'remove') + 'Class']('mif-tree-drag-current');
	},
	
	onStart: function(){
		Mif.Tree.Drag.dropZone=this;
		this.tree.unselect();//TODO don't change selection on drag and drop
		this.setDroppables();
		this.onStartOrComplete('start');
		this.addGhost();
	},
	
	onComplete: function(){
		this.onStartOrComplete('complete');
		var dropZone=Mif.Tree.Drag.dropZone;
		if(!dropZone || dropZone.where=='notAllowed'){
			Mif.Tree.Drag.startZone.onStop();
			Mif.Tree.Drag.startZone.emptydrop();
			return;
		}
		if(dropZone.onStop) dropZone.onStop();
		dropZone.beforeDrop();
	},
	
	addToGroups: function(groups){
		groups=$splat(groups);
		this.groups.combine(groups);
		groups.each(function(group){
			Mif.Tree.Drag.groups[group]=(Mif.Tree.Drag.groups[group]||[]).include(this);
		}, this);
	},
	
	setDroppables: function(droppables){
		this.droppables.combine($splat(droppables));
		this.groups.each(function(group){
			this.droppables.combine(Mif.Tree.Drag.groups[group]);
		}, this);
	},
	
	dragTargetSelect: function(){
		function addDragTarget(){
			this.current.getDOM('name').addClass('mif-tree-drag-current');
		}
		function removeDragTarget(){
			this.current.getDOM('name').removeClass('mif-tree-drag-current');
		}
		this.addEvent('start',addDragTarget.bind(this));
		this.addEvent('beforeComplete',removeDragTarget.bind(this));
	},
	
	leave: function(event){
		var dropZone=Mif.Tree.Drag.dropZone;
		if(dropZone){
			dropZone.where='notAllowed';
			Mif.Tree.Drag.ghost.firstChild.className='mif-tree-ghost-icon mif-tree-ghost-'+dropZone.where;
			if(dropZone.onleave) dropZone.onleave();
			Mif.Tree.Drag.dropZone=false;
		}
		var relatedZone=this.getZone(event.relatedTarget);
		if(relatedZone) this.enter(null, relatedZone);
	},
	
	onLeave: function(){
		this.tree.unselect();
		this.clean();
		$clear(this.scrolling);
		this.scrolling=null;
		this.target=false;
	},
	
	enter: function(event, zone){
		if(event) zone=this.getZone(event.target);
		var dropZone=Mif.Tree.Drag.dropZone;
		if(dropZone && dropZone.onLeave) dropZone.onLeave();
		Mif.Tree.Drag.dropZone=zone;
		zone.current=Mif.Tree.Drag.current;
		if(zone.onEnter) zone.onEnter();
	},
	
	onEnter: function(){
		this.onLeave()
	},
	
	getZone: function(target){//private leave/enter
		if(!target) return false;
		var parent=$(target);
		do{
			for(var l=this.droppables.length;l--;){
				var zone=this.droppables[l];
				if( parent==zone.getElement() ) {
					return zone;
				}
			}
			parent=parent.getParent();
		}while(parent);
		return false;
	},
	
	stopOnEscape: function(event){
		if(event.key=='esc') {
			var zone=Mif.Tree.Drag.dropZone;
			if(zone) zone.where='notAllowed';
			this.stop(event);
		}
	},
	
	autoScroll: function(){
		var y=this.y;
		if(y==-1) return;
		var wrapper=this.tree.wrapper;
		var top=y-wrapper.scrollTop;
		var bottom=wrapper.offsetHeight-top;
		var sign=0;
		if(top<this.tree.height){
			var delta=top;
			sign=1;
		}else if(bottom<this.tree.height){
			var delta=bottom;
			sign=-1;
		}
		if(sign && !this.scrolling){
			this.scrolling=function(node){
				if(y!=this.y){
					y=this.y;
					delta = (sign==1 ? (y-wrapper.scrollTop) : (wrapper.offsetHeight-y+wrapper.scrollTop))||1;
				}
				wrapper.scrollTop=wrapper.scrollTop-sign*this.options.scrollSpeed/delta;
			}.periodical(this.options.scrollDelay, this, [sign])
		}
		if(!sign){
			$clear(this.scrolling);
			this.scrolling=null;
		}
	},
	
	drag: function(event){
		Mif.Tree.Drag.ghost.position({
			x: event.page.x+20,
			y: event.page.y+20
		});
		var dropZone=Mif.Tree.Drag.dropZone;
		if(!dropZone||!dropZone.onDrag) return;
		dropZone.onDrag(event);
	},

	onDrag: function(event){
		this.autoScroll();
		
		if(!this.checkTarget(event)) return;
		
		this.clean();
		var where=this.where;
		var target=this.target;
		var ghostType=where;
		if( (where=='after' && target && (target.getNext())) || (where=='before' && (target.getPrevious())) ){
			ghostType='between';
		}
		Mif.Tree.Drag.ghost.firstChild.className=ghostType;
		if(where=='notAllowed'){
			this.tree.unselect();
			return;
		}
		if(target && target.tree) this.tree.select(target);
		if(where=='inside'){
			if(target.tree && !target.isOpen() && !this.openTimer && (target.property.loadable||target.hasChildren()) ){
				this.wrapper=target.getDOM('wrapper').setStyle('cursor', 'progress');
				this.openTimer=function(){
					target.toggle();
					this.clean();
				}.delay(this.options.open,this);
			}
		}else{
			var wrapper=this.tree.wrapper;
			this.pointer.setStyles({
				left: wrapper.scrollLeft,
				top: this.pos.top-this.tree.wrapper.getPosition().y,
				width: wrapper.clientWidth
			});
		}
	},

	clean: function(){
		this.pointer.style.width=0;
		if(this.openTimer){
			$clear(this.openTimer);
			this.openTimer=false;
			this.wrapper.style.cursor='inherit';
			this.wrapper=false;
		}
	},
	
	addGhost: function(){
		var node=this.current;
		var cls=node.get('open') ? node.get('openIcon') : node.get('closeIcon');
		Mif.Tree.Drag.ghost=new Element('ghost', {
			'class': 'notAllowed'
		})
		.inject(document.body)
		.set('html', '<indicator></indicator>'+'<icon class="' + cls +'"></icon><name>'+node.get('name')+'</name>')
		.setStyle('opacity', 0.7);
	},
	
	checkTarget: function(event){
		var targetElement=document.elementFromPoint(event.page.x, event.page.y);
		if(!targetElement) return;
		var uid=targetElement.getAttribute('uid');
		var target=Mif.Tree.Nodes[uid];
		if(!target){
			if(this.options.allowContainerDrop && (this.tree.forest||!this.tree.root)){
				this.target=this.tree.$index.getLast();
				this.index=this.tree.$index.length-1;
				if(this.index==-1){
					this.where='inside';
					this.target=this.tree.root||this.tree;
				}else{
					this.where='after';
				}
			}else{
				this.target=false;
				this.where='notAllowed';
			}
			this.fireEvent('drag');
			return true;
		};
		if(this.current.contains(target)){
			this.target=target;
			this.where='notAllowed';
			this.fireEvent('drag');
			return true;
		};
		var row=document.id('mif-tree-node-'+uid);
		var position=row.getCoordinates();
		this.pos=position;
		var delta=(event.page.y-position.top)/position.height;
		var deny=target.get('dropDenied');
		if(this.tree.sortable){
			deny.include('before').include('after');
		};
		var where;
		if(!deny.contains('inside') && delta>(position.height/4) && delta<(3/4*position.height)){
			where='inside';
		}else{
			if(delta<position.height/2){
				if(deny.contains('before')){
					if(deny.contains('inside')){
						where=deny.contains('after') ? 'notAllowed' : 'after';
					}else{
						where='inside';
					}
				}else{
					where='before';
				}
			}else{
				if(deny.contains('after')){
					if(deny.contains('inside')){
						where=deny.contains('before') ? 'notAllowed' : 'before';
					}else{
						where='inside';
					}
				}else{
					where='after';
				}
			}
		};
		if(this.where==where && this.target==target) return false;
		this.where=where; 
		this.target=target;
		this.fireEvent('drag');
		return true;
	},
	
	emptydrop: function(){
		var current=this.current, target=this.target, where=this.where;
		var scroll=this.tree.scroll;
		var complete=function(){
			scroll.removeEvent('complete', complete);
			if(this.options.animate){
				var wrapper=current.getDOM('wrapper');
				var position=wrapper.getPosition();
				Mif.Tree.Drag.ghost.set('morph',{
					duration: 'short',
					onComplete: function(){
						Mif.Tree.Drag.ghost.dispose();
						this.fireEvent('emptydrop', this.element);
					}.bind(this)
				});
				Mif.Tree.Drag.ghost.morph({left: position.x, top: position.y});
				return;
			};
			//Mif.Tree.Drag.ghost.dispose();
			this.fireEvent('emptydrop', this.element);
			return;
		}.bind(this);
		scroll.addEvent('complete', complete);
		this.tree.select(this.current);
		this.tree.scrollTo(this.current);
	},
	
	beforeDrop: function(){
		if(this.options.beforeDrop){
			this.options.beforeDrop.apply(this, [this.current, this.target, this.where]);
		}else{
			this.drop();
		}
	},
	
	drop: function(){
		var current=this.current, target=this.target, where=this.where;
		//Mif.Tree.Drag.ghost.dispose();
		var action=this.action || (this.tree.key[this.options.modifier] ? 'copy' : 'move');
		if(this.where=='inside' && target.tree && !target.isOpen()){
			if(target.tree) target.toggle();
			if(target.$loading){
				var onLoad=function(){
					this.tree[action](current, target, where);
					this.tree.select(current).scrollTo(current);
					this.fireEvent('drop', [current, target, where]);
					target.removeEvent('load',onLoad);
				};
				target.addEvent('load',onLoad);
				return;
			};
		};
		this.tree[action](current, target, where);
		this.tree.select(current).scrollTo(current);
		this.fireEvent('drop', [current, target, where]);
	},
	
	onStop: function(){
		this.clean();
		$clear(this.scrolling);
	}
});

Mif.Tree.Drag.groups={};

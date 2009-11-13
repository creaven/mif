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
	
	'ghost copy': {
		'background-image': 'copy.gif'.toMifImg(),
		'background-repeat': 'no-repeat',
		'width': '4px'
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

	'tree .drag-source': {
		//'background-color': '#cfcfd8'
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
			owner: tree,
			snap: this.options.snap,
			groups: [],
			droppables: []
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
		this.pointer=new Element('pointer').inject(tree.wrapper, 'top');
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
			onComplete: this.onComplete.bind(this),
			onOpen: this.onOpen.bind(this)
		};
		this.attach();
		
		this.addEvent('start', this.bound.onStart);
		this.addEvent('complete', this.bound.onComplete);
	},
	
	getElement: function(){
		return this.tree.element;
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
			item.getElement()[(what == 'start' ? 'add' : 'remove') + 'Events']({
				mouseleave: this.bound.leave, 
				mouseenter: this.bound.enter
			});
		}, this);
		Mif.Tree.Drag.current.getElement('name')[(what == 'start' ? 'add' : 'remove') + 'Class']('drag-source');
		//Mif.Tree.Drag.current.getElement('node').setStyle('opacity', (what=='start' ? 0.5 : 1));
		//Mif.Tree.Drag.current.getElement('children').setStyle('opacity', (what=='start' ? 0.5 : 1));
	},
	
	onStart: function(){
		Mif.Tree.Drag.dropZone=this;
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
	
	leave: function(event){
		var dropZone=Mif.Tree.Drag.dropZone;
		if(dropZone){
			dropZone.where='notAllowed';
			Mif.Tree.Drag.ghost.getElement('indicator').className='notAllowed';
			if(dropZone.onLeave) dropZone.onLeave();
			Mif.Tree.Drag.dropZone=false;
		}
		var relatedZone=this.getZone(event.relatedTarget);
		if(relatedZone) this.enter(null, relatedZone);
	},
	
	onLeave: function(){
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
			for(var l=this.droppables.length; l--; ){
				var zone=this.droppables[l];
				if( parent==zone.getElement() ){
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
		if(!dropZone||!dropZone.onDrag) return true;
		dropZone.onDrag(event);
		return true;
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
		Mif.Tree.Drag.ghost.getElement('indicator').className=ghostType;
		if(where=='notAllowed'){
			return;
		}
		//if(target && target.tree) this.tree.select(target);
		if(where=='inside'){
			if(target.tree && !target.isOpen() && !this.openTimer && (target.property.loadable||target.hasChildren()) ){
				this.openingElement=target.getElement('row').setStyle('cursor', 'progress');
				this.openTimer=setTimeout(this.bound.onOpen, this.options.open);
			}
		}else{
			var wrapper=this.tree.wrapper;
			//var top=this.index*this.tree.height;
			var top=this.coords.top-this.tree.wrapper.getPosition().y+(this.where=='after' ? this.coords.height : 0);
			this.pointer.setStyles({
				left: wrapper.scrollLeft,
				top:  top,
				width: wrapper.clientWidth
			});
		}
	},
	
	onOpen: function(){
		this.target.toggle();
		this.clean();
	},

	clean: function(){
		this.pointer.style.width=0;
		if(this.openTimer){
			$clear(this.openTimer);
			this.openTimer=false;
			this.openingElement.style.cursor='inherit';
			this.openingElement=false;
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
		this.tree.mouse(event);
		var target=this.tree.mouse.node;
		var row=this.tree.mouse.node.getElement('row')
		if(!target){
			if(this.options.allowContainerDrop && (this.tree.forest||!this.tree.root)){
				this.target=this.tree.$index.getLast();
				this.index=this.tree.$index.length-1;
				if(this.index==-1){
					this.where='inside';
					this.target=this.tree.root||this.tree;
				}else{//TODO fix - add this.coords
					this.where='after';
				}
			}else{
				this.target=false;
				this.where='notAllowed';
			}
			this.fireEvent('drag');
			return true;
		};
		if(this.current.contains(target)){//TODO allow drop inside self if it's copy
			this.target=target;
			this.where='notAllowed';
			this.fireEvent('drag');
			return true;
		};
		var coords=row.getCoordinates();
		this.coords=coords;
		var delta=(event.page.y-coords.top)/coords.height;
		var deny=target.get('dropDenied');
		if(this.tree.sortable){
			deny.include('before').include('after');
		};
		var where;
		if(!deny.contains('inside') && delta>(1/4) && delta<(3/4)){
			where='inside';
		}else{
			if(delta<1/2){
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
				var wrapper=current.getElement('node');
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
			Mif.Tree.Drag.ghost.dispose();
			this.fireEvent('emptydrop', this.element);
			return;
		}.bind(this);
		scroll.addEvent('complete', complete);
		this.tree.select(this.current);
		this.tree.scrollTo(this.current);
	},
	
	beforeDrop: function(){
		if(this.options.beforeDrop){
			if(this.options.beforeDrop.apply(this, [this.current, this.target, this.where])){
				this.drop();
			}else{
				this.emptydrop();
			};
		}else{
			this.drop();
		}
	},
	
	drop: function(){
		var current=this.current, target=this.target, where=this.where;
		Mif.Tree.Drag.ghost.dispose();
		var action=this.options.action || (Mif.Key.modifier.contains(this.options.modifier) ? 'copy' : 'move');
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
		this.tree.unselect();
		var resultNode=this.tree[action](current, target, where);
		Mif.Tree.Drag.dropZone.owner.focus();
		this.tree.select(resultNode).scrollTo(resultNode);
		this.fireEvent('drop', [current, target, where, resultNode]);
	},
	
	onStop: function(){
		this.clean();
		$clear(this.scrolling);
	}
});

Mif.Tree.Drag.groups={};

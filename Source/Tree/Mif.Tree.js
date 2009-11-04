/*
Mif.Tree
*/

Mif.sheet.addRules({
	'row, children, tree, node': {
		'display': 'block'
	},

	'name': {
		'display': 'inline'
	},

	'tree': {
		'position': 'relative',
		'width': '100%',
		'height':'100%',
		'margin': '0',
		'padding': '0',
		'overflow': 'auto',
		'font-family': 'sans-serif',
		'font-size': '11px',
		'line-height': '18px',
		'white-space': 'nowrap',
		'cursor': 'default'
	},

	'tree:focus': {
		'outline': '0'
	},

	'tree icon, tree gadget, tree checkbox, tree name': {
		'padding-bottom': '2px',
		'padding-top': '2px',
		'cursor': 'inherit'
	},

	'tree children': {
		'width': '100%'
	},

	'tree children children node': {
		'padding-left': '36px'
	},

	'tree row': {
		'width': '100%',
		'position': 'relative'
	},

	'tree name': {
		'cursor': 'default',
		'overflow': 'hidden',
		'margin-left': '4px'
	},

	'tree node': {
	/*background:url('hline.gif') no-repeat 9px center;*/
	},

	/*@gadgets*/
	'tree gadget': {
		'padding-right': '16px',
		'z-index': '1',
		'overflow': 'hidden',
		'background-repeat': 'no-repeat',
		'cursor': 'default',
		'background-position': 'center center'
	},

	'.mif-tree-gadget-none': {
		'visibility': 'hidden'
	},

	'.mif-tree-gadget-minus': {
		'background-image': 'down.png'.toMifImg()
	},

	'.mif-tree-gadget-plus': {
		'background-image': 'right.png'.toMifImg()
	},

	'tree icon': {
		'padding-right': '18px',
		'background-position': '0 50%',
		'background-repeat': 'no-repeat',
		'cursor': 'inherit'
	},
	
	'.mif-tree-open-icon': {
		'background-image': 'openicon.gif'.toMifImg()
	},

	'.mif-tree-close-icon': {
		'background-image': 'closeicon.gif'.toMifImg()
	},

	'.mif-tree-loader-open-icon, .mif-tree-loader-close-icon': {
		'background-image': 'loader.gif'.toMifImg()
	}/*,
	
	'tree row:hover name': {
		'text-decoration': 'underline'
	},
	
	'tree row:hover children name':{
		'text-decoration': 'none'
	}*/
	
});

for(var i=1; i<30; i++){
	var rule='tree '+'children '.repeat(i)+'node';
	Mif.sheet.addRule(rule, 'padding-left: '+18*i+'px');
}


Mif.Tree = new Class({

	Implements: [new Events, new Options],
		
	options:{
		types: {},
		forest: false,
		animateScroll: true,
		height: 18,
		expandTo: true,
		selectable: ['input']
	},
	
	initialize: function(options) {
		this.setOptions(options);
		$extend(this, {
			types: $extend({
				dflt: {}
			}, this.options.types),
			forest: this.options.forest,
			animateScroll: this.options.animateScroll,
			height: this.options.height,
			container: $(options.container),
			UID: 0,
			key: {},
			expanded: []
		});
		this.defaults={
			name: '',
			cls: '',
			openIcon: 'mif-tree-open-icon',
			closeIcon: 'mif-tree-close-icon',
			loadable: false,
			hidden: false,
			open: false,
			type: 'dflt'
		};
		this.$index=[];
		this.updateOpenState();
		if(this.options.expandTo) this.initExpandTo();
		Mif.Tree.UID++;
		this.wrapper=new Element('tree').addClass('mif-tree-wrapper').injectInside(this.container);
		this.initEvents();
		this.initScroll();
		this.initSelection();
		this.addEvent('drawChildren', function(parent){
			var nodes=parent._toggle||[];
			for(var i=0, l=nodes.length; i<l; i++){
				nodes[i].drawToggle();
			}
			parent._toggle=[];
		});
		if (this.options.initialize && MooTools.version>='1.2.2') {
			this.options.initialize.call(this);
		}
		if(this.options.data){
			this.load(this.options.data)
		}
		if(Mif.Tree.KeyNav){
			new Mif.Tree.KeyNav(this);
		}
	},
	
	initEvents: function(){
		this.wrapper.addEvents({
			mousemove: this.mouse.bind(this),
			mouseover: this.mouse.bind(this),
			mouseout: this.mouse.bind(this),
			mouseleave: this.mouseleave.bind(this),
			mousedown: function(event){
				this.fireEvent('mousedown');
				this.stopSelection(event);
			}.bind(this),
			click: this.toggleClick.bind(this),
			dblclick: this.toggleDblclick.bind(this)
		});
		if(Browser.Engine.trident){
			this.wrapper.addEvent('selectstart', this.stopSelection.bind(this));
		}        
		this.container.addEvent('click', this.focus.bind(this));
		document.addEvent('click', this.blurOnClick.bind(this));
		document.addEvents({
			keydown: this.keyDown.bind(this),
			keyup: this.keyUp.bind(this)
		});
    },
	
	stopSelection: function(event){
		var target=$(event.target);
		var selectable=this.options.selectable;
		for(var i=0, l=selectable.length;i<l;i++){
			if(target.match(selectable[i])) return true;
		}
		return false;
	},
    
	blurOnClick: function(event){
		var target=event.target;
		while(target){
			if(target==this.container) return;
			target=target.parentNode;
		}
		this.blur();
	},
    
	focus: function(){
		if(this.focused) return this;
		this.focused=true;
		this.container.addClass('mif-tree-focused');
		return this.fireEvent('focus');
	},
    
	blur: function(){
		if(!this.focused) return this;
		this.focused=false;
		this.container.removeClass('mif-tree-focused');
		return this.fireEvent('blur');
	},
	
	$getIndex: function(){//return array of visible nodes.
		this.$index=[];
		var node=this.forest ? this.root.getFirst() : this.root;
		var previous=node;
		while(node){
			if(!(previous.hidden && previous.contains(node))){
				if(!node.hidden) this.$index.push(node);
				previous=node;
			}
			node=node._getNextVisible();
		}
	},
	
	mouseleave: function(){
		this.mouse.coords={x:null,y:null};
		this.mouse.target=false;
		this.mouse.node=false;
		if(this.hover) this.hover();
	},
	
	mouse: function(event){
		this.mouse.coords=this.getCoords(event);
		var target=this.getTarget(event);
		this.mouse.target=target.target;
		this.mouse.node	= target.node;
	},
	
	getTarget: function(event){
		var target=event.target, node;
		while(!/mif-tree/.test(target.className)){
			target=target.parentNode;
		}
		var test=target.tagName.toLowerCase().match(/(gadget)|(icon)|(name)|(checkbox)/);
		if(!test){
			var y=this.mouse.coords.y;
			if(y==-1||!this.$index) {
				node=false;
			}else{
				node=this.$index[((y)/this.height).toInt()];
			}
			return {
				node: node,
				target: 'node'
			};
		}
		for(var i=5;i>0;i--){
			if(test[i]){
				var type=test[i];
				break;
			}
		}
		return {
			node: Mif.Tree.Nodes[target.getAttribute('uid')],
			target: type
		};
	},
	
	getCoords: function(event){
		var position=this.wrapper.getPosition();
		var x=event.client.x-position.x;
		var y=event.client.y-position.y;
		var wrapper=this.wrapper;
		if((y-wrapper.scrollTop>wrapper.clientHeight)||(x-wrapper.scrollLeft>wrapper.clientWidth)){//scroll line
			y=-1;
		};
		return {x:x, y:y};
	},
	
	keyDown: function(event){
		this.key=event;
		this.key.state='down';
		if(this.focused) this.fireEvent('keydown', [event]);
	},
	
	keyUp: function(event){
		this.key={};
		this.key.state='up';
		if(this.focused) this.fireEvent('keyup', [event]);
	},
	
	toggleDblclick: function(event){
		var target=this.mouse.target;
		if(!(target=='name'||target=='icon')) return;
		this.mouse.node.toggle();
	},
	
	toggleClick: function(event){
		if(this.mouse.target!='gadget') return;
		this.mouse.node.toggle();
	},
	
	initScroll: function(){
		this.scroll=new Fx.Scroll(this.wrapper, {link: 'cancel'});
	},
	
	scrollTo: function(node){
		var position=node.getVisiblePosition();
		var top=position*this.height;
		var up=top<this.wrapper.scrollTop;
		var down=top>(this.wrapper.scrollTop+this.wrapper.clientHeight-this.height);
		if(position==-1 || ( !up && !down ) ) {
			this.scroll.fireEvent('complete');
			return false;
		}
		if(this.animateScroll){
			this.scroll.start(this.wrapper.scrollLeft, top-(down ? this.wrapper.clientHeight-this.height : this.height));
		}else{
			this.scroll.set(this.wrapper.scrollLeft, top-(down ? this.wrapper.clientHeight-this.height : this.height));
			this.scroll.fireEvent('complete');
		}
	},
	
	updateOpenState: function(){
		this.addEvents({
			'drawChildren': function(parent){
				var children=parent.children;
				for(var i=0, l=children.length; i<l; i++){
					children[i].updateOpenState();
				}
			},
			'drawRoot': function(){
				this.root.updateOpenState();
			}
		});
	},
	
	expandTo: function(node){
		if (!node) return this;
		var path = [];
		while( !node.isRoot() && !(this.forest && node.getParent().isRoot()) ){
			node=node.getParent();
			if(!node) break;
			path.unshift(node);
		};
		path.each(function(el){
			el.toggle(true)
		});
		return this;
	},
	
	initExpandTo: function(){
		this.addEvent('loadChildren', function(parent){
			if(!parent) return;
			var children=parent.children;
			for( var i=children.length; i--; ){
				var child=children[i];
				if(child.property.expandTo) this.expanded.push(child);
			}
		});
		function expand(){
			this.expanded.each(function(node){
				this.expandTo(node);
			}, this);
			this.expanded=[];
		};
		this.addEvents({
			'load': expand.bind(this),
			'loadNode': expand.bind(this)
		});
	}
	
});

Mif.Tree.UID=0;

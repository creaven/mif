/*
Mif.Tree
*/

Mif.sheet.addRules({
	'row, children, tree, node, wrapper': {
		'display': 'block'
	},

	'tree': {
		'position': 'relative',
		'width': '100%',
		'height': '100%',
		'min-height': Browser.Engine.trident5 ? '100%' : 'auto',
		'overflow': 'auto',
		'font-family': '"Lucida Grande", "Lucida Sans Unicode", Arial, Verdana, sans-serif',
		'font-size': '12px',
		'color': '#000',
		'line-height': '18px',
		'white-space': 'nowrap',
		'cursor': 'default'
	},
	
	'tree wrapper': {
		'height': Browser.Engine.trident5 ? 'auto' : '100%',
		'min-height': Browser.Engine.trident5 ? '100%' : 'auto',
		'width': '100%',
		'overflow': 'visible',
		'display': 'table',
		'position': 'absolute',
		'background-image': 'zebra.png'.toMifImg()
	},

	'tree:focus': {
		'outline': '0'
	},

	'tree icon, tree gadget, tree checkbox, tree name': {
		'cursor': 'inherit',
		'display': Browser.Engine.trident5 ? 'inline-block' : 'table-cell',
		'height': '18px',
		'vertical-align': 'middle'
	},
	
	'tree node': {
		'height': '18px'
	},

	'tree children': {
		'width': '100%',
		'display': 'none'
	},

	'tree children children node': {
		'padding-left': '36px'
	},

	'tree row': {
		'width': '100%',
		'position': 'relative',
		'height': '18px'
	},

	'tree name': {
		'cursor': 'default',
		'overflow': 'hidden',
		'padding-left': '4px'
	},

	'tree icon': {
		'padding-right': '18px',
		'background-position': '0 50%',
		'background-repeat': 'no-repeat',
		'cursor': 'inherit'
	},
	
	'.mif-tree-open-icon': {
		'background-image': 'openicon.png'.toMifImg()
	},

	'.mif-tree-close-icon': {
		'background-image': 'closeicon.png'.toMifImg()
	},
	
	'tree row:hover name': {
		'text-decoration': 'underline'
	}
	
});

(function(){
	for(var i=1; i<30; i++){
		var rule='tree '+'children '.repeat(i)+'node';
		Mif.sheet.addRule(rule, 'padding-left: '+18*i+'px');
	}
})();


Mif.Tree = new Class({

	Implements: [new Events, new Options],
		
	options:{
		types: {},
		forest: false,
		animateScroll: true,
		height: 18,
		selectable: ['input']
	},
	
	initialize: function(options) {
		this.setOptions(options);
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
		$extend(this, {
			types: $extend({
				dflt: {}
			}, this.options.types),
			forest: this.options.forest,
			animateScroll: this.options.animateScroll,
			container: $(options.container),
			UID: 0,
			key: {},
			expanded: [],
			mouse: {}
		});
		this.height=Mif.sheet.getRule('tree').style.lineHeight.toInt();
		this.$index=[];
		this.updateOpenState();
		Mif.Tree.UID++;
		this.element=new Element('tree').inject(this.container);
		this.wrapper=new Element('wrapper').inject(this.element);
		this.bound={};
		this.initEvents();
		this.initScroll();
		this.initSelection();
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
		$extend(this.bound, {
			onMouseleave: this.onMouseleave.bind(this),
			onMousedown: this.onMousedown.bind(this),
			onMouseup: this.onMouseup.bind(this),
			stopSelection: this.stopSelection.bind(this),
			toggleOnClick: this.toggleOnClick.bind(this),
			toggleOnDblclick: this.toggleOnDblclick.bind(this),
			blurOnClick: this.blurOnClick.bind(this),
			focus: this.focus.bind(this)
		});
		this.wrapper.addEvents({
			mouseleave: this.bound.onMouseleave,
			mousedown: this.bound.onMousedown,
			mouseup: this.bound.onMouseup,
			click: this.bound.toggleOnClick,
			dblclick: this.bound.toggleOnDblclick
		});
		if(Browser.Engine.trident){
			this.wrapper.addEvent('selectstart', this.bound.stopSelection);
		};
		this.addEvent('mousedown', this.bound.focus);
		document.addEvent('click', this.bound.blurOnClick);
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
			if(target==this.element) return;
			target=target.parentNode;
		}
		this.blur();
	},
    
	focus: function(){
		if(this.focused) return this;
		this.focused=true;
		this.element.addClass('mif-tree-focused');
		return this.fireEvent('focus');
	},
    
	blur: function(){
		if(!this.focused) return this;
		this.focused=false;
		this.element.removeClass('mif-tree-focused');
		return this.fireEvent('blur');
	},
	
	$getIndex: function(){//returns array of visible nodes.
		this.$index=[];
		var node=this.forest ? this.root.getFirst() : this.root;
		var previous=node;
		while(node){
			if(!(previous.property.hidden && previous.contains(node))){
				if(!node.property.hidden) this.$index.push(node);
				previous=node;
			}
			node=node._getNextVisible();
		}
	},
	
	onMouseleave: function(event){
		this.mouse.coords={x:null,y:null};
		this.mouse.target=false;
		this.mouse.node=false;
		this.fireEvent('mouseleave', [event]);
	},
	
	onMousedown: function(event){
		var target=document.elementFromPoint(event.page.x, event.page.y);
		if(!target) target=this.element;
		this.mouse.target=target.tagName.toLowerCase();
		this.mouse.node=Mif.Tree.Nodes[target.getAttribute('uid')];
		this.fireEvent('mousedown', [event]);
		this.stopSelection(event);
		event.preventDefault();
	},
	
	onMouseup: function(event){
		this.fireEvent('mouseup', [event]);
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
	
	toggleOnDblclick: function(event){
		var target=this.mouse.target;
		this.mouse.node.toggle();
	},
	
	toggleOnClick: function(event){
		if(this.mouse.target!='gadget') return;
		this.mouse.node.toggle();
	},
	
	initScroll: function(){
		this.scroll=new Fx.Scroll(this.element, {link: 'cancel'});
	},
	
	scrollTo: function(node){//TODO buggy if exists horizontal scroll line
		var position=node.getVisiblePosition();
		var top=position*this.height;
		var up=top<this.element.scrollTop;
		var down=top>(this.element.scrollTop+this.element.clientHeight-this.height);
		if(position==-1 || ( !up && !down ) ) {
			this.scroll.fireEvent('complete');
			return false;
		}
		if(this.animateScroll){
			this.scroll.start(this.element.scrollLeft, top-(down ? this.element.clientHeight-this.height : this.height));
		}else{
			this.scroll.set(this.element.scrollLeft, top-(down ? this.element.clientHeight-this.height : this.height));
			this.scroll.fireEvent('complete');
		}
	},
	
	updateOpenState: function(){
		this.addEvents({
			'drawChildren': function(parent){
				var children=parent.children;
				for(var i=0, l=children.length; i<l; i++){
					if(children[i].property.open){
						children[i].drawToggle();
					}
				}
			},
			'drawRoot': function(){
				this.root.drawToggle();
			}
		});
	}
	
});

Mif.Tree.UID=0;

/*
Mif.Tree
*/

Mif.Tree = new Class({
	
	Extends: Mif.Component,
		
	options: {
		types: {},
		forest: false,
		animateScroll: true,
		selectable: ['input']
	},
	
	defaults: {
		name: '',
		cls: '',
		openIcon: 'mif-tree-open-icon',
		closeIcon: 'mif-tree-close-icon',
		loadable: false,
		hidden: false,
		open: false,
		type: 'dflt'
	},
	
	initialize: function(options) {
		this.setOptions(options);
		$extend(this, {
			types: $extend({
				dflt: {}
			}, this.options.types),
			forest: this.options.forest,
			$index: [],
			focusable: true,
			itemName: 'row',
			height: Mif.sheet.getRule('tree').style.lineHeight.toInt()
		});
		this.updateOpenState();
		this.element=new Element('tree').inject(document.id(this.options.container)||Mif.temp);
		this.wrapper=new Element('wrapper').inject(this.element);
		this.itemContainer=this.wrapper;
		this.parent();
		this.scroll=new Fx.Scroll(this.element, {link: 'cancel'});
		this.addSelection().addHover();
		this.loader=this.options.loader||new Mif.Tree.Loader;
		if(this.options.loaderOptions){
			this.loader.options=this.options.loaderOptions;
		}
		if(this.options.data){
			this.load(this.options.data)
		}
		if(this.options.initialize) this.options.initialize.call(this);
	},
	
	events: function(){
		this.parent();
		$extend(this.bound, {
			toggleOnClick: this.toggleOnClick.bind(this),
			toggleOnDblclick: this.toggleOnDblclick.bind(this)
		});
		this.wrapper.addEvents({
			click: this.bound.toggleOnClick,
			dblclick: this.bound.toggleOnDblclick
		});
    },
	
	toggleOnDblclick: function(event){
		var target=this.mouse.target;
		this.mouse.item.toggle();
	},
	
	toggleOnClick: function(event){
		if(this.mouse.target!='toggle') return;
		this.mouse.item.toggle();
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
	
	scrollTo: function(node){//TODO buggy if exists horizontal scroll line
		var position=node.getVisiblePosition();
		var top=position*this.height;
		var up=top<this.element.scrollTop;
		var down=top>(this.element.scrollTop+this.element.clientHeight-this.height);
		if(position==-1 || ( !up && !down ) ) {
			this.scroll.fireEvent('complete');
			return false;
		}
		if(this.options.animateScroll){
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

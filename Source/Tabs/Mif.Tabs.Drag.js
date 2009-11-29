
Mif.Tabs.Drag=new Class({
	
	Extends: Drag,
	
	Implements: [Events, Options],
	
	options: {
		snap: 4,
		fxComplete: {
			duration: 150
		},
		fxDrag: {
			duration: 150
		}
	},
	
	initialize: function(tabs, options){
		this.setOptions(options);
		this.document=document;
		this.owner=tabs;
		this.handles=this.owner.header;
		this.element=[this.current, this.target, this.where];
		this.selection = (Browser.Engine.trident) ? 'selectstart' : 'mousedown';
		this.bound = {
			start: this.start.bind(this),
			check: this.check.bind(this),
			drag: this.drag.bind(this),
			stop: this.stop.bind(this),
			cancel: this.cancel.bind(this),
			eventStop: $lambda(false),
			//leave: this.leave.bind(this),
			//enter: this.enter.bind(this),
			//stopOnEscape: this.stopOnEscape.bind(this),
			onStart: this.onStart.bind(this),
			onComplete: this.onComplete.bind(this)/*,
			onOpen: this.onOpen.bind(this)*/
		};
		this.attach();
		this.addEvent('start', this.bound.onStart);
		this.addEvent('complete', this.bound.onComplete);
	},
	
	start: function(event){
		var target=this.owner.mouse.target;
		if(!target) return;
		this.current=this.owner.mouse.item;
		if(!this.current || this.current.property.dragDisabled) return;
		this.fireEvent('beforeStart', this.element);
		Mif.Tree.Drag.current=this.current;
		Mif.Tree.Drag.startZone=this;
		this.mouse={
			start: event.page
		}
		document.addEvents({
			mousemove: this.bound.check, 
			mouseup: this.bound.cancel
		});
		document.addEvent(this.selection, this.bound.eventStop);
	},
	
	onStart: function(){
		var tab=this.current.getElement('tab');
		this.currentPos=this.current.index();
		this.tabWidth=tab.offsetWidth;
		var nextTab=this.current.getNext();
		if(nextTab){
			nextTab.getElement('tab').setStyle('margin-left', this.tabWidth);
			this.nextTab=nextTab;
		}
		tab.setStyles({
			position: 'absolute',
			top: 0,
			left: tab.offsetLeft
		});
		this.offsetLeft=this.currentPos*this.tabWidth;
		this.tab=tab;
		var fx=new Fx($extend(this.options.fxDrag, {
			onStart: function(){
				this.fxComplete=false;
			}.bind(this),
			onComplete: function(){
				this.fxComplete=true;
			}.bind(this),
			onCancel: function(){
				this.set(this.tabWidth);
				this.fxComplete=true;
			}
		}));
		fx.tabWidth=this.tabWidth;
		fx.set=function(now){
			if(this.first) this.first.setStyle('margin-left', this.tabWidth-now)
			if(this.second) this.second.setStyle('margin-left', now)
		}
		this.fx=fx;
	},
	
	onComplete: function(){
		var nextTab=this.nextTab;
		this.fx.cancel();
		var fx=new Fx.Morph(this.current.getElement('tab'), $extend(this.options.fxComplete, {
			onComplete: function(){
				this.element.setStyles({
					position: '',
					top: '',
					left: ''
				});
				if(nextTab){
					nextTab.getElement('tab').setStyle('margin-left', '');
				}
			}
		}));
		fx.start({
			left: this.current.index()*this.tabWidth
		})
		
	},
	
	drag: function(event){
		var left=this.offsetLeft - this.mouse.start.x + event.page.x;
		var pos=(left/this.tabWidth+0.5).floor();
		if(pos!=this.currentPos && pos<this.owner.items.length && pos>-1){
			if(pos<this.currentPos){
				var newNextTab=this.owner.items[pos];
				var fx=this.fx;
				if(!this.fxComplete){
					fx.cancel()
				}
				fx.first=this.nextTab ? this.nextTab.getElement('tab') : null;
				fx.second=newNextTab.getElement('tab');
				fx.start(0, this.tabWidth)
				this.nextTab=newNextTab;
				this.current.inject(newNextTab, 'before');
			}else{
				var newNextTab=this.owner.items[pos+1];
				var fx=this.fx;
				if(!this.fxComplete){
					fx.cancel()
				}
				fx.first=this.nextTab ? this.nextTab.getElement('tab') : null;
				fx.second=newNextTab ? newNextTab.getElement('tab') : null;
				fx.start(0, this.tabWidth)
				
				if(newNextTab) {
					this.current.inject(newNextTab, 'before');
				}else{
					this.current.inject(newNextTab, 'bottom')
				}
				this.nextTab=newNextTab;
			}
			this.currentPos=pos;
		}
		this.tab.setStyle('left', left);
	}
	
});
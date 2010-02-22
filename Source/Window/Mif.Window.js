/*
Mif.Window
*/

Mif.Window=new Class({
	
	Extends: Mif.Element,
	
	options: {
		title: 'untitled',
		toolbar: 'hidden',
		tbar: null,
		bbar: null
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.element=new Element('window').inject(document.body);
		var html='<bg>'+Mif.bg+'</bg>'+
			'<titlebar>'+
			 	'<text>'+this.options.title+'</text>'+ 
				'<toolbar></toolbar>'+ 
			'</titlebar>'+
			'<content></content>'+
			'<bottombar></bottombar>'+
			'<handle></handle>';
		this.element.innerHTML=html;
		var content = this.getElement('content');
		this.injectElement = content;
		var toolbar = this.getElement('toolbar');
		if(this.options.toolbar == 'hidden') toolbar.addClass('hidden');
		this.toolbarShowFx = new Fx.Elements([toolbar, content], {
			
		});
		this.toolbarHideFx = new Fx.Elements([toolbar, content], {

		});
		var button1=new Mif.Button({
			'class': 'toolbar',
			text: ''
		}).inject(toolbar);
		this.events();
		this.registerResizable();
		this.setHandle();
		this.makeDraggable();
		if(this.options['class']){
			this.element.addClass(this.options['class']);
		}
		this.addButtons();
		this.height();
		this.height();//ie7
	},
	
	events: function(){
		
	},
	
	setHandle: function(){
		this.element.makeResizable({
			handle: this.element.getElement('handle'),
			onDrag: function(){
				this.height();
				this.fireEvent('resize');
				Mif.fireEvent('resize', this);
			}.bind(this),
			limit: {x: [100, 10000], y: [100, 10000]}
		});
	},
	
	makeDraggable: function(){
		var self = this;
		this.element.makeDraggable({
			handle: this.element.getElement('titlebar')
		});
	},
	
	height: function(){
		var height=this.element.offsetHeight - this.getElement('titlebar').offsetHeight - this.getElement('bottombar').offsetHeight;
		this.getElement('content').setStyle('height', height);
		var text = this.element.getElement('titlebar text');
		text.setStyle('display', 'inline');
		text.setStyle('width', text.offsetWidth + this.getElement('titlebar group').offsetWidth*2);
		text.setStyle('display', '');
	},
	
	addButtons: function(){
		buttons = this.options.buttons||{
			'close': 'close',
			'collapse': 'collapse',
			'expand': 'expand'
		};
		var buttonGroup=new Element('group').inject(this.getElement('titlebar'), 'top').addEvents({
			mouseenter: function(){
				this.addClass('hover');
			},
			mouseleave: function(){
				this.removeClass('hover')
			},
			mousedown: $lambda(false)
		});
		var btn;
		for(var button in buttons){
			btn = new Mif.Button({
				'class': 'window '+button,
				hasText: false,
				hasIcon: false
			}).inject(buttonGroup);
			btn.element.addEvent('mousedown', $lambda(false));
		}
		
		btn = this.tbarButton = new  Mif.Button({
			'class': 'window tbar',
			hasText: false,
			hasIcon: false
		}).inject(this.getElement('titlebar'));
		btn.element.addEvent('mousedown', $lambda(false));
		this.bound('toggletoolbar');
		btn.element.addEvent('click', this.bound.toggletoolbar);
	},
	
	toggletoolbar: function(){
		var toolbar = this.getElement('toolbar');
		var content = this.getElement('content');
		if(toolbar.hasClass('hidden')){
			toolbar.removeClass('hidden');
			this.toolbarHideFx.cancel();
			this.toolbarShowFx.start({
				'0': {
					height: [toolbar.offsetHeight, 100]
				},
				'1': {
					height: [content.offsetHeight, this.element.offsetHeight - this.getElement('titlebar').offsetHeight - this.getElement('bottombar').offsetHeight - 100]
				}
			});
		}else{
			toolbar.addClass('hidden');
			this.toolbarShowFx.cancel();
			this.toolbarHideFx.start({
				'0': {
					height: [toolbar.offsetHeight, 0]
				},
				'1': {
					height: [content.offsetHeight, this.element.offsetHeight - this.getElement('titlebar').offsetHeight - this.getElement('bottombar').offsetHeight]
				}
			});
		}
	}
	
})
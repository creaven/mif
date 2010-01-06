/*
Mif.Window
*/

Mif.Window=new Class({
	
	Extends: Mif.Element,
	
	options: {
		title: 'untitled',
		topbar: 'hidden',
		tbar: null,
		bbar: null
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.element=new Element('window').inject(document.body);
		var html='<bg>'+Mif.bg+'</bg>'+
			'<titlebar>'+
			 	'<text>'+this.options.title+'</text>'+ 
			'</titlebar>'+
			'<topbar></topbar>'+ 
			'<content></content>'+
			'<bottombar></bottombar>'+
			'<handle></handle>';
		this.element.innerHTML=html;
		var content = this.getElement('content');
		this.injectElement = content;
		var topbar = this.getElement('topbar');
		if(this.options.topbar == 'hidden') topbar.addClass('hidden');
		this.topbarShowFx = new Fx.Elements([topbar, content], {
			
		});
		this.topbarHideFx = new Fx.Elements([topbar, content], {

		});
		var button1=new Mif.Button({
			'class': 'toolbar',
			text: ''
		}).inject(topbar);
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
		var height=this.element.offsetHeight - this.getElement('titlebar').offsetHeight - this.getElement('bottombar').offsetHeight - this.getElement('topbar').offsetHeight;
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
		this.bound('toggleTopbar');
		btn.element.addEvent('click', this.bound.toggleTopbar);
	},
	
	toggleTopbar: function(){
		var topbar = this.getElement('topbar');
		var content = this.getElement('content');
		if(topbar.hasClass('hidden')){
			topbar.removeClass('hidden');
			this.topbarHideFx.cancel();
			this.topbarShowFx.start({
				'0': {
					height: [topbar.offsetHeight, 100]
				},
				'1': {
					height: [content.offsetHeight, this.element.offsetHeight - this.getElement('titlebar').offsetHeight - this.getElement('bottombar').offsetHeight - 100]
				}
			});
		}else{
			topbar.addClass('hidden');
			this.topbarShowFx.cancel();
			this.topbarHideFx.start({
				'0': {
					height: [topbar.offsetHeight, 0]
				},
				'1': {
					height: [content.offsetHeight, this.element.offsetHeight - this.getElement('titlebar').offsetHeight - this.getElement('bottombar').offsetHeight]
				}
			});
		}
	}
	
})
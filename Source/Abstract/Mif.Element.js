/*
Mif.Element
*/

Mif.Element=new Class({

	Implements: [Events, Options],
	
	initialize: function(){
		this.UID=++Mif.UID;
		Mif.uids[this.UID]=this;
		this.element.setAttribute('uid', this.UID);
		if(this.options.id){
			Mif.ids[this.options.id]=this;
		}
	},
	
	bound: function(){
		var self=this;
		Array.each(arguments, function(name){
			self.bound[name]=self[name].bind(self);
		});
	},
	
	addRule: function(selector, styles){
		Mif.sheet.addRule('[uid="'+this.UID+'"] '+selector, styles);
		return this;
	},
	
	addRules: function(rules){
		for(var selector in rules){
			Mif.sheet.addRule('[uid="'+this.UID+'"] '+selector, rules[selector]);	
		}
		return this;
	},
	
	inject: function(element, how){
		if($type(element) == 'string') element = document.id(element);
		if($type(element)!='element'){
			element=element.injectElement;
		}
		this.element.inject(element, how);
		return this.fireEvent('inject', [element, how]);
	},
	
	getElement: function(el){
		return this.element.getElement(el);
	},
	
	registerResizable: function(){
		Mif.resizable.include(this);
	}
	
});

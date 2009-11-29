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
		this.element.inject(element, how);
		return this.fireEvent('inject', [element, how]);
	},
	
	getElement: function(el){
		return this.element.getElement(el);
	}
	
});

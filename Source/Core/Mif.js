if(Browser.Engine.trident && Browser.Engine.version==4){
	throw Error('ie6 not supported');
};

Mif={
	version: 'dev',
	build: '%build%'
}

Mif.ids={};

Mif.id=function(id){
	return Mif.ids[id];
}

function $mix(original, extended, defaults){
	for (var key in (extended || {})) {
		if(original[key]==undefined||original[key]==defaults[key]){
			original[key] = extended[key];
		}
	}
	return original;
};

['tree', 'checkbox', 'row', 'node', 'gadget', 'icon', 'name', 'children', 'background', 'wrapper'].each(function(tag){
	document.createElement(tag);
});

Mif.Util={};

Mif.Util.StyleSheet=new Class({
 
	initialize: function(){
		this.createSheet();
		this.rules={};
		this.styles={};
		this.index=[];
	},
 
	createSheet: function(){
		var style = new Element('style').inject(document.head);
		this.sheet=style.styleSheet||style.sheet;
	},
 
	addRule: function(selector, styles){
		selector=selector.trim();
		if(selector.contains(',')){
			var selectors=selector.split(',');
			selectors.each(function(selector){
				this.addRule(selector, styles);
			}, this);
			return this;
		}
		var styles=$type(styles)=='string' ? styles : this.stylesToString(styles);
		if(!styles) return;
		var sheet=this.sheet;
		if(sheet.addRule){
			sheet.addRule(selector, styles);   
		}else{
			sheet.insertRule(selector+'{'+styles+'}', sheet.cssRules.length);
		}
		var rules=this.getRules();
		this.rules[selector]=rules.getLast();
		this.styles[selector]=styles;
		this.index.push(selector);
		return this;
	},
 
	addRules: function(rules){
		for(selector in rules)
			this.addRule(selector, rules[selector]);
		return this;
	},
 
	stylesToString: function(styles){
		var string='';
		for(p in styles)
			string+=p.hyphenate()+':'+styles[p]+';\n';
		return string;
	},
 
	removeRule: function(index){
		var sheet=this.sheet;
		if($type(index)=='string'){
			var selector=index.trim();
			if(selector.contains(',')){
				var selectors=selector.split(',');
				selectors.each(function(selector){
					this.removeRule(selector);
				}, this);
				return this;
			}
			var index=this.getRules().indexOf(this.getRule(selector));
			if(index<0) return this;
		}
		sheet.removeRule ? sheet.removeRule(index) : sheet.deleteRule(index);
		var selector=this.index[index];
		this.index.erase(selector);
		delete this.rules[selector];
		delete this.styles[selector];
		return this;
	},
 
	getRule: function(selector){
		return $type(selector)=='string' ? this.rules[selector] : this.getRules()[selector];
	},
 
	getRules: function(){
		return $A(this.sheet.cssRules||this.sheet.rules);
	}
});
 
Mif.Util.StyleSheet.implement({
	debug: function(){
		var code='';
		for(selector in this.styles){
			code+=selector+'{\n'+this.styles[selector]+'}\n';
		}
		return code;
	}
});
 
Mif.sheet=new Mif.Util.StyleSheet();

String.implement({

	toMifImg: function(){
		if(!Browser.Engine.trident){
			return 'url(data:;base64,'+MifImage[this]+')';
		}else{
			return 'url(mhtml:'+MifImage+'!'+this+')';
		}
	},
	
	repeat: function(times){
		return new Array(times + 1).join(this);
	}
	
});

Array.implement({
	
	inject: function(added, current, where){//inject added after or before current;
		var pos=this.indexOf(current)+(where=='before' ? 0 : 1);
		for(var i=this.length-1;i>=pos;i--){
			this[i+1]=this[i];
		}
		this[pos]=added;
		return this;
	}
	
});

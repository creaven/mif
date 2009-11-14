
Mif=new new Class({
	
	Implements: [Events],
	
	version: 'dev',
	
	build: '%build%'
});

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

if(Browser.Engine.trident){
	['tree', 'checkbox', 'row', 'node', 'gadget', 'icon', 'name', 'children', 'background', 'wrapper', 'pointer', 'ghost', 'indicator', 'root', 'copy', 'bt', 'bg', 'text'].each(function(tag){
		document.createElement(tag);
	});
};

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

Mif.Focus=null;

String.implement({

	toMifImg: function(){//for normal browser MifImage - object {name: base64_encoded_image}, for ie MifImage - url to mhtml file
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


Element.implement({

	getAncestor: function(match, top){//includes self
		var parent=this;
		while(parent){
			if(parent.match(match)) return parent;
			parent=parent.getParent();
			if(parent==top) return false;
		}
		return false;
	},
	
	setContent: function(content){
		return (typeof content == 'string') ? this.set('html', content) : this.adopt(content);
	}
	
});

//Keyboard

Event.Keys.extend({
	'pgdown': 34,
	'pgup': 33,
	'home': 36,
	'end': 35
});


Mif.Key={
	modifier: []
};

document.addEvent('keydown', function(event){
	Mif.Key.code=event.code;
	Mif.Key.name=event.key;
	['alt', 'control', 'meta', 'shift'].each(function(modifier){
		if(event[modifier]){
			Mif.Key.modifier.include(modifier);
		}
	});
	Mif.Key.event=event;
	Mif.fireEvent('keydown', event);
});

document.addEvent('keyup', function(event){
	Mif.Key.code=null;
	Mif.Key.name=null;
	Mif.Key.modifier=[];
	Mif.Key.event=null;
	Mif.fireEvent('keyup', event);
});

Mif.Mouse={};
(function(){

	document.addEvent('mouseup', function(event){
		Mif.fireEvent('mouseup', event);
	});
	
	document.addEvent('mousedown', function(){
		Mif.Mouse.down=true;
	});	

	if(Browser.Engine.trident){
		function mouseup(event){
			if(event.event.button==0) Mif.fireEvent('mouseup', event);
			document.removeEvent('mousemove', mouseup);
		}
		document.addEvent('mouseleave', function(){
			if(Mif.Mouse.down) document.addEvent('mousemove', mouseup);
		});
	};

})();

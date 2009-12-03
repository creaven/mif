
Mif=new new Class({
	
	Implements: [Events],
	
	version: 'dev',
	
	build: '%build%'
});

Mif.ids={};
Mif.id=function(id){
	return Mif.ids[id];
}

Mif.uids={};
Mif.UID=0;

function $mix(original, extended, defaults){
	for (var key in (extended || {})) {
		if(original[key]==undefined||original[key]==defaults[key]){
			original[key] = extended[key];
		}
	}
	return original;
};

if(Browser.Engine.trident){
	['tree', 'checkbox', 'row', 'node', 'toggle', 'icon', 'name', 'children', 'background', 'wrapper', 'pointer', 'ghost', 'indicator', 'root', 'copy', 'pushbutton', 'bg', 'text', 'window', 'handle', 'titlebar', 'bottombar', 'content', 'tabs', 'tab', 'container',  'header', 'scroll', 'l', 'r', 't', 'b', 'c', 'layout', 'overlay', 'temp'].each(function(tag){
		document.createElement(tag);
	});
};

Mif.StyleSheet=new Class({
 
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
	},
	
	addBackground: function(selector, img, coords){
		var left=coords.left||0;
		var top=coords.top||0;
		var right=coords.right||0;
		var bottom=coords.bottom||0;
		var l=coords.l||0;
		var t=coords.t||0;
		var paddingLeft=coords['padding-left']||0;
		var paddingTop=coords['padding-top']||0;
		var ext='png';
		imgs={};
		['tl', 'tr', 'bl', 'br', 't', 'b', 'l', 'r', 'c'].each(function(side){
			imgs[side]=img+'-'+side+'.png';
		});
		return this.addRule(selector+', '+selector+' div', {
			'position': 'absolute',
			'overflow': 'hidden'
		})
		.addRule(selector, {
			'left': l+'px',
			'top': t+'px',
			'padding-left': paddingLeft+'px',
			'padding-top': paddingTop+'px',
			'width': '100%',
			'height': '100%'
		})
		.addRule(selector+' .top', {
			'height': top+'px',
			'width': '100%',
			'position': 'relative',
			'top': -paddingTop+'px',
			'padding-left': paddingLeft+'px',
			'padding-top': paddingTop+'px',
			'left': -paddingLeft+'px'
		})
		.addRule(selector+' .center', {
			'height': '100%',
			'width': '100%',
			'position': 'relative',
			'top': -(bottom+top+2*paddingTop)+'px',
			'padding-left': paddingLeft+'px',
			'padding-top': paddingTop+'px',
			'left': -paddingLeft+'px'
		})
		.addRule(selector+' .bottom', {
			'height': bottom+'px',
			'width': '100%',
			'top': -(bottom+top+2*paddingTop)+'px',
			'position': 'relative',
			'padding-left': paddingLeft+'px',
			'left': -paddingLeft+'px'
		})
		.addRule(selector+' .tl', {
			'width': left+'px',
			'height': top+'px',
			'background': imgs['tl'].toMifImg(),
			'left': '0px',
			'top': '0px'
		})
		.addRule(selector+' .tr', {
			'width': right+'px',
			'height': top+'px',
			'float': 'right',
			'position': 'relative',
			'background': imgs['tr'].toMifImg(),
			'top': -paddingTop+'px'
		})
		.addRule(selector+' .t', {
			'height': top+'px',
			'width': '100%',
			'left': -(right+paddingLeft)+'px',
			'top': '0px',
			'clip': 'rect(auto auto auto '+(left+right+paddingLeft)+'px)',
			'background': imgs['t'].toMifImg(),
			'padding-left': paddingLeft+'px'
		})
		.addRule(selector+' .bl', {
			'width': left+'px',
			'height': bottom+'px',
			'background': imgs['bl'].toMifImg(),
			'left': '0px'
		})
		.addRule(selector+' .br', {
			'width': right+'px',
			'height': bottom+'px',
			'float': 'right',
			'position': 'relative',
			'background': imgs['br'].toMifImg()
		})
		.addRule(selector+' .b', {
			'height': bottom+'px',
			'width': '100%',
			'left': -(right+paddingLeft)+'px',
			'clip': 'rect(auto auto auto '+(left+right+paddingLeft)+'px)',
			'background': imgs['b'].toMifImg(),
			'padding-left': paddingLeft+'px'
		})
		.addRule(selector+' .l', {
			'height': '10000px',
			'width': left+'px',
			'left': '0px',
			'top': (top+bottom)+'px',
			'background': imgs['l'].toMifImg()
		})
		.addRule(selector+' .r', {
			'height': '10000px',
			'width': right+'px',
			'top': (top+bottom-paddingTop)+'px',
			'float': 'right',
			'position': 'relative',
			'background': imgs['r'].toMifImg()
		})
		.addRule(selector+' .c', {
			'height': '10000px',
			'width': '100%',
			'left': -(right+paddingLeft)+'px',
			'top': (top+bottom)+'px',
			'clip': 'rect(auto auto auto '+(left+right+paddingLeft)+'px)',
			'background': imgs['c'].toMifImg(),
			'padding-left': paddingLeft+'px'
		});
	}
	
});
/*
Mif.StyleSheet.implement({
	debug: function(){
		var code='';
		for(selector in this.styles){
			code+=selector+'{\n'+this.styles[selector]+'}\n';
		}
		return code;
	}
});
*/
Mif.sheet=new Mif.StyleSheet();

Mif.sheet.addRules({
	
	'html, body': {
		'width': '100%',
		'height': '100%',
		'position': 'absolute'
	},
	
	'*': {
		'margin': '0',
		'padding': '0'
	}
	
});

Mif.bg='<div class="top">'+
			'<div class="tl"></div>'+
			'<div class="t"></div>'+
			'<div class="tr"></div>'+
		'</div>'+
		'<div class="center">'+
			'<div class="l"></div>'+
			'<div class="c"></div>'+
			'<div class="r"></div>'+
		'</div>'+
		'<div class="bottom">'+
			'<div class="bl"></div>'+
			'<div class="b"></div>'+
			'<div class="br"></div>'+
		'</div>';

Mif.temp=new Element('temp');
window.addEvent('domready', function(){
	Mif.temp.inject(document.body);
});

Mif.sheet.addRule('temp', {
	'width': '0',
	'height': '0',
	'overflow': 'hidden',
	'display': 'none'
});

Mif.Focus=null;

String.implement({

	toMifImg: function(src){//for normal browser MifImage - object {name: base64_encoded_image}, for ie MifImage - url to mhtml file
		if(!Browser.Engine.trident){
			return src ? 'data:;base64,'+MifImage[this] : 'url(data:;base64,'+MifImage[this]+')';
		}else{
			return src ? 'mhtml:'+MifImage+'!'+this : 'url(mhtml:'+MifImage+'!'+this+')';
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
		var type=$type(content);
		if(type=='string') return this.set('html', content);
		if(type=='element') return this.adopt(content);
		return this.adopt(content.element);
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

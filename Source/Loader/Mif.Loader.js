/*
---
 
script: Mif.Loader.js
 
description: Mif Loader base class
 
license: MIT-style license
 
authors:
- Anton Samoylov
 
requires:
- /Mif.Core
 
provides: [Mif.Loader]
 
...
*/

Mif.Loader = new Class({
	
	Implements: [Events],
	
	initialize: function(options){
		this.options = options;
		this.defaultOptions = {
			isSuccess: $lambda(true),
			secure: true,
			onSuccess: this.onSuccess,
			method: 'get',
			type: 'json'
		};
	},
	
	toOptions: function(options){
		if(!options) return {};
		var type = $type(options);
		if(type =='array'||type =='element'){
			options = {loadData: options};
		}else if(type =='string'){
			options = {url: options};
		}
		return options;	
	},
	
	load: function(item, options){
		item.$loading = true;
		options = this.toOptions(options);
		var defaultOptions = $unlink(this.defaultOptions);
		var localOptions = {};
		var globalOptions = this.toOptions($lambda(this.options)(item));
		if(item.owner){
			localOptions = this.toOptions($lambda(item.property.loaderOptions)(item));
		}
		options = $extend($extend($extend(defaultOptions, globalOptions), localOptions), options);
		var owner;
		if(item.owner){
			owner = item.owner;
		}else{
			owner = item;
			item = null;
		}
		if(item){
			item.getElement('icon').addClass('loader-icon');
		}
		var struct = {item: item, owner: owner};
		options.loadData = options.loadData||options.json||options.xml;
		if(options.loadData){
			return this.loadData(options.loadData, struct, options);
		}
		var request = new Mif.Request(options);
		request.struct = struct;
		request.loader = this;
		request.send();
	},
	
	onSuccess: function(text, xml){
		var data = this.options.type =='xml' ? xml : JSON.decode(text);
		this.loader.loadData(data, this.struct, this.options);
	},
	
	/*onError: function(){
		
	},*/
	
	loadData: function(data, struct, options){
		var node = struct.item;
		var tree = struct.owner;
		var type = options.type;
		if(!node && tree.forest){
			tree.root = new Mif.Tree.Item({}, {
				owner: tree,
				parentItem: null
			});
			struct.item = tree.root;
		}
		this[type.capitalize()+'ToJs'](data, struct, options);
		if(node){
			node.$loading = null;
			tree.update(node);
			node.fireEvent('load');
			tree.fireEvent('load', node);
		}else{
			tree.$loading = null
			tree[tree.forest ? 'drawForestRoot' : 'drawRoot'](tree);
			tree.$getIndex();
			tree.fireEvent('load');
		}
	},
	
	JsonToJs: function(data, struct, options){
		var parent = struct.item;
		var tree = struct.owner;
		var children = data;
		var storage = tree.storage;
		for( var i = children.length; i--; ){
			var child = children[i];
			var subChildren = child.children;
			var property = child;
			if(options.processProperty){
				property = options.processProperty(child);
			}
			var node = new Mif.Tree.Item(property, {
				owner: tree,
				parentItem: parent
			});
			node.storage = storage.add(property, {parent: (parent ? parent.storage : null)});// row= {value: property, parent: parent, children: []}
			if( tree.forest || parent != undefined){
				parent.children.unshift(node);
			}else{
				tree.root = node;
			}
			if(subChildren && subChildren.length){
				arguments.callee(subChildren, {item: node, owner: tree}, options);
			}
		}
		if(parent) parent.property.loaded = true;
	},
	
	XmlToJs: function(data, struct, options){
		var parent = struct.item;
		var tree = struct.owner;
		var children = data.childNodes;
		for( var i = children.length; i--; ){
			var child = children[i];
			var subChildren = child;
			var attributes = child.attributes;
			var props = {};
			for(var j = 0,l = attributes.length; j<l; j++){
				var attr = attributes[j];
				props[attr.nodeName] = attr.nodeValue;
			}
			var node = new Mif.Tree.Item(props, {
				owner: tree,
				parentItem: parent
			});
			if( tree.forest || parent != undefined){
				parent.children.unshift(node);
			}else{
				tree.root = node;
			}
			if(subChildren && subChildren.childNodes.length){
				arguments.callee(subChildren, {item: node, owner: tree});
			}
		}
		if(parent) parent.property.loaded = true;
	}
	
});

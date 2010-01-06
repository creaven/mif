/*
---
 
script: Mif.Menu.js
 
description: Mif Menu base class
 
license: MIT-style license
 
authors:
- Anton Samoylov
 
requires:
- /Mif.Core
 
provides: [Mif.Menu]
 
...
*/

Mif.Menu=new Class({

	Extends: Mif.Component,
	
	options: {
		
	},
	
	defaults: {
		type: 'default',
		checked: false,
		disabled: false,
		name: ''
	},

	initialize: function(options){
		this.setOptions(options);
		this.element=new Element('menu').inject(Mif.temp);
		this.bg=new Element('bg').inject(this.element);
		this.wrapper=new Element('wrapper').inject(this.element);
		this.itemContainer=this.wrapper;
		this.itemName='item';
		this.parent(options);
	}
		
});

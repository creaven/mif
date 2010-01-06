/*
---
 
script: Mif.Store.js
 
description: Mif Store base class
 
license: MIT-style license
 
authors:
- Anton Samoylov
 
requires:
- /Mif.Core
 
provides: [Mif.Store]
 
...
*/

/*

json = [
	{
	prop: 'moo', prop2: 'moo2',
	children: {
		length: 1000, offset: 3, limit: 50
		{
		prop: 'mooooo',	prop2: 'mooooo2'
		},
		{
		prop: 'moooooooo', prop2: 'mooooooo2'   <----- modified
		}
	}
	},
	{
	prop: 'mix', prop2: 'twix'
	}

]


{
id: {
prop: newValue
}


}




 root
  |_
    |-node1
    |-node2         <----- branch point
         |-node2.0
         |-node2.1
         |-node2.2
         |-node2.3
          ...
         |-node2.999
    |-node3
   

updateView startPos, endPos

var pos = 0;
var branches = [];
for(var i = 0, l = points.length; i < l; i++){
	var nextPos = points[i].len;
	if(pos > startPos){
		branches.push(points[i]);
	}
	if(nextPos)
}

____________.____|__.__.____|____.____._______.________.________.________  <-- 3branches 1,2,3; 1 - (4, 6), 2 - (0,2), 3 - (0,3)


*/

Mif.Storage=new Class({
	
	initialize: function(){
		this.items = [];
		this.loader = new Mif.Loader();
	},
	
	load: function(options, row){
		row = row || this;
		this.loader.load(row, options);
	},
	
	add: function(property, struct, where){
		var row = {
			property: property,
			parent: struct.parent,
			children: []
		};
		if(struct.parent){
			struct.parent.children[where == 'bottom' ? 'push' : 'unshift'](row);
		}
		this.items.push(row);
		row.uid = this.items.length;
		return row;
	},
	
	get: function(index){
		return this.items[index];
	}
	
});

Mif.Store=new Class({
	
	Implements: [Events, Options],
	
	options: {
		getRow: function(){
			
		},
		create: '/store/create/',
		retrieve: '/store/retrieve',
		update: '/store/update/',
		'delete': '/store/delete/'
	},
	
	initialize: function(options){
		this.setOptions(options);
	},
	
	find: function(){
		
	},
	
	query: function(){
		
	},
	
	filter: function(){
		
	},
	
	getChanged: function(){
		
	},
	
	commit: function(){
		
	},
	
	rollback: function(){
		
	}
	
});


/*
create
retrieve
update
delete

real data store -> mif.store -> 



new Mif.Grid({

}).connectToStore(store);

*/
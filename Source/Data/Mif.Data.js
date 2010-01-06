/*
Mif.Data.js
*/

/*
if two widgets use one data source, and one widget changes source, this changes should be reflected to second widget automaticaly.
*/

Mif.DS={}

/*example1*/
var bt1=new Mif.Button({
	title: 'moo title'.store('moo')
});

var bt2=new Mif.Button({
	title: 'moo'.retrieve()
});

bt1.set('title', 'moo2 title');
bt2.get('title')//moo2 title

/*example2*/
var title=Mif.Storage.store('moo', 'moo title');

var bt1=new Mif.Button({
	title: title
});

var bt2=new Mif.Button({
	title: title
});

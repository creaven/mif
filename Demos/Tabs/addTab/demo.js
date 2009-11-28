window.addEvent('domready', function(){
	SampleTabs=new Mif.Tabs({
		
	}).inject(document.body);
	SampleTabs.load([
		{
			title: 'tab1',
			content: 'first tab content here'
		},
		{
			title: 'tab2',
			content: 'second  tab content'
		},
		{
			title: 'tab3',
			content: 'third tab content',
			disabled: true
		},
		{
			title: 'tab4',
			content: 'fourth tab content'
		}
	]);
	console.log('wwww')
	var newAfterTab=new Mif.Tab({
		title: 'new after tab added',
		content: 'some new after tab content here'
	}, {owner: SampleTabs});
	newAfterTab.inject(SampleTabs.items[1])
	console.log('sdf')
	var newBeforeTab=new Mif.Tab({
		title: 'new before tab added',
		content: 'some new before tab content here'
	}, {owner: SampleTabs});
	newBeforeTab.inject(SampleTabs.items[1], 'before');
	console.log('before');
	var newTopTab=new Mif.Tab({
		title: 'new top tab added',
		content: 'some new top tab content here'
	}, {owner: SampleTabs});
	newTopTab.inject(SampleTabs.items[1], 'top')
	
	var newBottomTab=new Mif.Tab({
		title: 'new bottom tab added',
		content: 'some new bottom tab content here'
	}, {owner: SampleTabs});
	newBottomTab.inject(SampleTabs.items[1], 'bottom');
	
	var newTabAfterThird=new Mif.Tab({
		title: 'new tab after third',
		content: 'content for new tab after third'
	}, {owner: SampleTabs});
	
	newTabAfterThird.inject(3, 'after')
	
});
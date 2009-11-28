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
	
	var newAfterTab=new Mif.Tabs.Item({
		title: 'new after tab added',
		content: 'some new after tab content here'
	}, {owner: SampleTabs});
	newAfterTab.inject(SampleTabs.items[1])
	
	var newBeforeTab=new Mif.Tabs.Item({
		title: 'new before tab added',
		content: 'some new before tab content here'
	}, {owner: SampleTabs});
	newBeforeTab.inject(SampleTabs.items[1], 'before');
	
	var newTopTab=new Mif.Tabs.Item({
		title: 'new top tab added',
		content: 'some new top tab content here'
	}, {owner: SampleTabs});
	newTopTab.inject(SampleTabs.items[1], 'top')
	
	var newBottomTab=new Mif.Tabs.Item({
		title: 'new bottom tab added',
		content: 'some new bottom tab content here'
	}, {owner: SampleTabs});
	newBottomTab.inject(SampleTabs.items[1], 'bottom');
	
	var newTabAfterThird=new Mif.Tabs.Item({
		title: 'new tab after third',
		content: 'content for new tab after third'
	}, {owner: SampleTabs});
	newTabAfterThird.inject(3, 'after')
	
});
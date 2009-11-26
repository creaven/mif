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
	var newAfterTab=new Mif.Tab({
		title: 'new after tab added',
		content: 'some new after tab content here'
	}, {tabs: SampleTabs});
	newAfterTab.inject(SampleTabs.tabs[1])
	
	var newBeforeTab=new Mif.Tab({
		title: 'new before tab added',
		content: 'some new before tab content here'
	}, {tabs: SampleTabs});
	newBeforeTab.inject(SampleTabs.tabs[1], 'before')
	
	var newTopTab=new Mif.Tab({
		title: 'new top tab added',
		content: 'some new top tab content here'
	}, {tabs: SampleTabs});
	newTopTab.inject(SampleTabs.tabs[1], 'top')
	
	var newBottomTab=new Mif.Tab({
		title: 'new bottom tab added',
		content: 'some new bottom tab content here'
	}, {tabs: SampleTabs});
	newBottomTab.inject(SampleTabs.tabs[1], 'bottom');
	
	var newTabAfterThird=new Mif.Tab({
		title: 'new tab after third',
		content: 'content for new tab after third'
	}, {tabs: SampleTabs});
	
	newTabAfterThird.inject(3, 'after')
	
});
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
});
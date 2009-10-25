window.addEvent('domready', function(){
	var simpleMenu=new Mif.Menu({
		contextmenu: true,
		target: $('menu-target')
	});
	simpleMenu.load(
		[
			{
				name: 'new',
				onAction: function(){
					alert('new');
				}
			},
			{
				name: 'open',
				onAction: function(){
					alert('open');
				}
			},
			'-',
			{
				name: 'item3',
				disabled: true,
				menu: [
					{
						name: 'item3.1'
					},
					{
						name: 'item3.2'
					}
				]
			}
		]
	)
});
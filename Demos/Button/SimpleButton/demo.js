window.addEvent('domready', function(){
	var button1=new Mif.Button({
		text: 'push button',
		onClick: function(){
			alert('clicked');
		}
	}).inject('button_container');
	var button2=new Mif.Button({
		text: 'looooooooooooooooooooooooooooooooong text'
	}).inject('button_container');
	var button3=new Mif.Button({
		text: 'width=40px loooooooooooooooooooooong text',
		styles: {
			width: '40px'
		}
	}).inject('button_container');
	var button4=new Mif.Button({
		text: 'push'
	}).inject('button_container');
});
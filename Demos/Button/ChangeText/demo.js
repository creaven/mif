window.addEvent('domready', function(){
	var button1=new Mif.Button({
		text: 'push button'
	}).inject('button_container');
	
	$('set').addEvent('click', function(event){
		button1.set('text', $('change').value);
	})
	button1.set({'text': 'some button text'})
});
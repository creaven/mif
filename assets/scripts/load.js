window.DemoRoot=window.DemoRoot||'../';
if(Browser.Engine.trident){
	var MifImage=document.location.href.split('#')[0]+'/../'+DemoRoot+'/Source/images/MifImage.js';
}else{
	document.write('<script type="text/javascript" src="'+DemoRoot+'Source/images/MifImage.js"></scri'+'pt>');
}
if(window.DemoRoot){
	Builder.root=window.DemoRoot;
}

Builder.includeType('source');
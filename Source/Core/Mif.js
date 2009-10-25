Mif={
	version: 'dev',
	build: '%build%'
}

Mif.ids={};

Mif.id=function(id){
	return Mif.ids[id];
}

function $mix(original, extended, defaults){
	for (var key in (extended || {})) {
		if(original[key]==undefined||original[key]==defaults[key]){
			original[key] = extended[key];
		}
	}
	return original;
};
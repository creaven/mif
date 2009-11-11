DOMTree = new Mif.Tree({
	container: $('tree_container'),
	types: {
		dflt:{
			cls: 'dom-object',
			loadable: true
		},
		array:{
			loadable: true,
			cls: 'dom-array'
		},
		string:{
			selectClass: 'empty',
			loadable: false,
			cls: 'dom-string'
		},
		number:{
			selectClass: 'empty',//TODO fix, selectClass were removed
			loadable: false,
			cls: 'dom-number'
		}
	},
	sortable: true,
	initialize: function(){
		this.initSortable();
	}
})
.load({
	json: [{
		name: 'window',
		data:{
			dom: window
		}
	}]
});

DOMTree.loader.options=function(node){
	var json=[];
	var dom=node.property.data.dom;
	$try(function(){
		var type=$type(dom);
		switch(type){
			case 'string':
			case 'number':
			json.push({
					name: dom,
					type: type
			});
			break;
			case 'array':
			dom.each(function(el, i){
				json.push({
					name: i,
					type: 'array',
					data:{
						dom: el
					}
				});
			});
			break;
			default:
			for(var p in dom){
				$try(function(){
					var child={
						name: p,
						data:{
							dom: dom[p]
						}
					}
					if(typeof dom=='function') child.cls='dom-function';
					json.push(child);
				});
			}
		}
	});
	return {json: json};
}

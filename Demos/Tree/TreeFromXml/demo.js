window.addEvent('domready',function(){
	
	tree = new Mif.Tree({
		container: $('tree_container'),
		loaderOptions: {type: 'xml'}//,
		//loader: new Mif.Tree.XmlLoader
	});

	var xmlString='<nodes>'+
					'<node name="root">'+
						'<node name="node1"></node>'+
						'<node name="node2" open="true">'+
							'<node name="node2.1"></node>'+
							'<node name="node2.2"></node>'+
						'</node>'+
						'<node name="node4"></node>'+
						'<node name="node3"></node>'+
					'</node>'+
				'</nodes>';	
	var xml=XML.rootFromString(xmlString).documentElement;
	
	// load tree from json.
	tree.load(xml);
	
});
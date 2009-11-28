window.addEvent('domready',function(){
	
	Mif.Tree.XmlLoader=new Class({
		
		Extends: Mif.Tree.Loader,
		
		dataToObj: function(xml, struct){
			var parent=struct.node;
			var tree=struct.owner;
			var children=xml.childNodes;
			for( var i=children.length; i--; ){
				var child=children[i];
				var subChildren=child;
				var attributes=child.attributes;
				var props={};
				for(var j=0,l=attributes.length; j<l; j++){
					var attr=attributes[j];
					props[attr.nodeName]=attr.nodeValue;
				}
				var node=new Mif.Tree.Item(props, {
					owner: tree,
					parentNode: parent
				});
				if( tree.forest || parent != undefined){
					parent.children.unshift(node);
				}else{
					tree.root=node;
				}
				if(subChildren && subChildren.childNodes.length){
					this.dataToObj(subChildren, {node: node, owner: tree});
				}
			}
			if(parent) parent.property.loaded=true;
		},
		
		toOptions: function(options){
			if($type(options)=='element'){
				return {loadData: options};
			}
			return this.parent(options);
		}
		
	});
	
	tree = new Mif.Tree({
		container: $('tree_container'),
		loader: new Mif.Tree.XmlLoader
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
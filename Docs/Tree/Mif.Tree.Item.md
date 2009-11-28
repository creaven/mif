Class Mif.Tree.Item {#Mif.Tree.Item}
===================================
Tree node class.

### Implements:
	Events

Mif.Tree.Item Method: constructor {#Mif.Tree.Item:constructor}
------------------------------------------------
	
### Syntax:

	var node = new Mif.Tree.Item(structure, options);

### Arguments:

1. structure - (*object*) object {tree: tree, parentNode: parent}
1. options   - (*object*) Mif.Tree.Item options.

### Options:

* property         - (*object*) node attributes.
* data        - (*boolean*) user data object.

### Properties:

**property**

* name        - node name.  
* openIcon    - css class for open icon.
* closeIcon   - css class for close icon.
* openIconUrl - url for open icon
* closeIconUrl- url for close icon
* cls         - extra css class addes to node wrapper. See also html node structure in Mif.Tree.Draw.
* loadable    - Load nodes on expand using Mif.Tree.Item load method if node.state.loaded=false.
* id          - id. If id exists, we can get node using Mif.id(node_id) function.

**state**

* state     - node state object: {open:*boolean*, loaded:*boolean*}

**structure**

* parentNode - parent node
* tree       - node tree control



### Example:
	var newNode=new Mif.Tree.Item({
		parentNode: node1,
		tree: tree
	});




Mif.Tree.Item Method: getElement {#Mif.Tree.Item:getElement}
-----------------------------------------------------

return node dom structure element. See also Mif.Tree.Draw.

### Syntax:

	someNode.getElement(what);
	
### Arguments:

1. what - (*string*) wrapper or icon or node or name.

### Returns:

* (*element*) dom element.

### Example:
	
	someNode.getElement('name');


Mif.Tree.Item Method: toggle {#Mif.Tree.Item:toggle}
-----------------------------------------------------

By default toggles the node between expanded/collapsed.

### Syntax:

	someNode.toggle(state);
	
### Arguments:

1. state - (*string*) If state=true only expand node, if false - collapse.

### Returns:

* (*Mif.Tree.Item*) toggled node.

### Example:
	
	someNode.toggle();

Mif.Tree.Item Method: recursive {#Mif.Tree.Item:recursive}
----------------------------------------------------------

recursive walk throuth the tree and apply some function for each node.

### Syntax:

	node.recursive(fn, args);
	
### Arguments:

1. fn - (*function*) function which applied to each node.
2. args - (*boolean*) function arguments.

### Example:
	
	this.root.recursive(function(){
		this.toggle(null, false);
	});
	//expandes tree

Mif.Tree.Item Method: isOpen {#Mif.Tree.Item:isOpen}
----------------------------------------------------

return true if node opened, else false.

### Syntax:

	node.isOpen();
	
### Returns:
	
* (*boolean*) true if this is open node, either false.

### Example:
	
	alert(someNode.isOpen());

Mif.Tree.Item Method: isLoaded {#Mif.Tree.Item:isLoaded}
--------------------------------------------------------

Return true if node were loaded.

### Syntax:

	node.isLoaded();
	
### Returns:

* (*boolean*) true if this is loaded node, either false.

### Example:
	
	alert(someNode.isLoaded());




Mif.Tree.Item Method: isLast {#Mif.Tree.Item:isLast}
-----------------------------------------------------

return true if this is last child

### Syntax:

	node.isLast();
	
### Returns:

* (*boolean*) true if this is last node either false.

### Example:
	
	alert(someNode.isLast());

	

Mif.Tree.Item Method: isFirst {#Mif.Tree.Item:isFirst}
------------------------------------------------------

return true if this is first child

### Syntax:

	node.isFirst();
	
### Returns:

* (*boolean*) true if this is first child either false.

### Example:
	
	alert(someNode.isFirst());

	

Mif.Tree.Item Method: isRoot {#Mif.Tree.Item:isRoot}
----------------------------------------------------

return true if this is root node

### Syntax:

	node.isRoot();
	
### Returns:

* (*boolean*) true if this is root node either false.

### Example:
	
	alert(someNode.isRoot());



Mif.Tree.Item Method: getChildren {#Mif.Tree.Item:getChildren}
--------------------------------------------------------------

return this node children

### Syntax:

	node.getChildren();
	
### Returns:

* (*array*) this node children.

### Example:
	
	someNode.getChildren();


Mif.Tree.Item Method: getNext {#Mif.Tree.Item:getNext}
------------------------------------------------------

returns next node.

### Syntax:

	node.getNext();
	
### Returns:

* (*Mif.Tree.Item*) next node or null.

### Example:
	
	someNode.getNext();

Mif.Tree.Item Method: getPrevious {#Mif.Tree.Item:getPrevious}
--------------------------------------------------------------

returns previous node.

### Syntax:

	node.getPrevious();
	
### Returns:

* (*Mif.Tree.Item*) previous node or null.

### Example:
	
	someNode.getPrevious();

Mif.Tree.Item Method: getFirst {#Mif.Tree.Item:getFirst}
--------------------------------------------------------

returns first child.

### Syntax:

	node.getFirst();
	
### Returns:

* (*Mif.Tree.Item*) first child or null.

### Example:
	
	someNode.getFirst();

	
Mif.Tree.Item Method: getLast {#Mif.Tree.Item:getLast}
------------------------------------------------------

returns last child.

### Syntax:

	node.getLast();
	
### Returns:

* (*Mif.Tree.Item*) last child or null.

### Example:
	
	someNode.getLast();

Mif.Tree.Item Method: getParent {#Mif.Tree.Item:getParent}
----------------------------------------------------------

returns parent node.

### Syntax:

	node.getParent();
	
### Returns:

* (*Mif.Tree.Item*) parent node or null.

### Example:
	
	alert(someNode.getParent().name);



Mif.Tree.Item Method: getNextVisible {#Mif.Tree.Item:getNextVisible}
--------------------------------------------------------------------

returns next visible node.

### Syntax:

	node.getNextVisible();
	
### Returns:

* (*Mif.Tree.Item*) next visible node or null.

### Example:
	
	someNode.getNextVisible();
	


Mif.Tree.Item Method: getPreviousVisible {#Mif.Tree.Item:getPreviousVisible}
----------------------------------------------------------------------------

returns previous visible node.

### Syntax:

	node.getPreviousVisible();
	
### Returns:

* (*Mif.Tree.Item*) previous visible node or null.

### Example:
	
	someNode.getPreviousVisible();
	

Mif.Tree.Item Method: getVisiblePosition {#Mif.Tree.Item:getVisiblePosition}
----------------------------------------------------------------------------

returns position of node. If node invisible -1.

### Syntax:

	node.getVisiblePosition();
	
### Returns:

* (*number*) visible position.

### Example:
	
	alert(someNode.getVisiblePosition()==-1 ? someNode.name+' invisilbe' : someNode.name+' visible');
	
Mif.Tree.Item Method: contains {#Mif.Tree.Item:contains}
--------------------------------------------------------

returns true if this node contains other node.

### Syntax:

	node.contains(someNode);
	
### Argumens:

1. node - (*Mif.Tree.Item*) examined node.
	
### Returns:

* (*boolean*) returns true if this node contains other node or this is same node. Either false.

### Example:

##### example tree
	
	root
	 |_
	   |-node1
	   |-node2
	   |  |
	   |  |-node2.1
	   |  |-node2.2
	   |
	   |-node3
       |-node4
	
##### javascript

	alert(node2.contains(node2.1));//alert true.
	alert(node2.contains(node2));//alert true.
	alert(node3.contains(node1));//alert false;
	

Mif.Tree.Item Method: addType {#Mif.Tree.Item:addType}
------------------------------------------------------

add type to node (analog addClass for dom elements).

### Syntax:

	node.addType(type);
	
### Argumens:

1. type - (*string*) added type name.
	
### Returns:

* (*Mif.Tree.Item*) returns this node.

### Example:
	
	someNode.addType('bin');
	

Mif.Tree.Item Method: removeType {#Mif.Tree.Item:removeType}
------------------------------------------------------------

remove node type (analog removeClass for dom elements).

### Syntax:

	node.removeType(type);
	
### Argumens:

1. type - (*string*) removed type name.
	
### Returns:

* (*Mif.Tree.Item*) returns this node.

### Example:
	
	someNode.removeType('folder');
	

Mif.Tree.Item Method: set {#Mif.Tree.Item:set}
------------------------------------------------------------

set node properties.

### Syntax:

	node.set(props);
	
### Argumens:

1. props - (*object*) set props to node. Props may be property, data, type, state.
	
### Returns:

* (*Mif.Tree.Item*) returns this node.

### Example:
	
	node.set({
		property: {
			name: 'new node name',
			openIcon: 'some-open-icon'
		}
		type: 'file',
		data: {
			x: 'y'
		}
	});
	
	
	
	
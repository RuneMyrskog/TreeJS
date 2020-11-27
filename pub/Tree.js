structure = {
    child1: {
        text: "child1Text",
        callback: example_callback1, 
    },
    child2: {
        text: "child2Text",
    },
    child3: {
        text: "child3Text",
        children: {
            child3_child1: {
                text: "c3c1",
                callback: example_callback2,
            },
            child3_child2: {
                text: "c3c2"
            },
        }
    }
}



class Node {
    constructor(id, structure, options=false){
        this.structure = structure;
        this.id = id;
        this.options = options; 
        this.domNode = null;
        this.previousDisplayStyle = null;
        this.children = [];

        if('text' in structure){
            this.text = structure.text;
        }else{
            this.text = null;
        }

        if('callback' in structure){
            this.callback = structure.callback.bind(this);
        }else{
            this.callback = null;
        }
    }

    collapse(){
        console.log("collapsing", this.id)
        for(var i in this.children){
            var child = this.children[i];
            if(child.domNode && child.domNode.style.display !== "none"){
                child.previousDisplayStyle = child.domNode.style.display;
                
            }
            child.domNode.style.display = "none";
            //child.collapse();
        }
        

    }

    expand(){
        for(var i in this.children){
            var child = this.children[i];
            if(child.domNode){
                child.domNode.style.display = "block";
            }
            child.expand();
        }
    }

    expandAll(){
        //recursive
        for(var i in this.children){
            var child = this.children[i];
            if(child.domNode){
                child.domNode.style.display = "block";
            }
            child.expand();
        }
    }

    getStructure(){
        return this.structure;
    }
}

function example_callback1(){
    alert("callback 1 triggered");
}

function example_callback2(){
    alert("callback 2 triggered");
}
    
class Tree {
    constructor(rootid, structure, options=false, styles=false){
        this.structure = structure

        this.rootNode = new Node(rootid, structure, options);
        for(var child_id in structure){
            var childNode = _createTree(child_id, structure[child_id], options);
            this.rootNode.children.push(childNode);
        }
        //console.log(this.rootNode.children)

        this.domNode = null;
    }

    structure() {
        return this.structure;
    }

    rootNode(){
        return this.rootNode;
    }

    collapse(){
        for(var i in this.rootNode.children){
            let child = this.rootNode.children[i];
            child.collapse();
            }
        }
    

    expand(){
        this.rootNode.expand();
    }
    expandAll(){
        this.rootNode.expandAll();
    }
}

function _createTree(id, structure, options=false){
    var root = new Node(id, structure, options);

    if('children' in structure){
        for(var child_id in structure.children){
            var childNode = _createTree(child_id, structure.children[child_id], options);
            root.children.push(childNode);
        }
    }
    return root;
    
}

function _createDomTree(node, isRoot=false){
    var domNode = document.createElement("div");
    domNode.id = node.id;
    if(isRoot){
        domNode.className = "TreeJSRootNode";
    }else{
        domNode.className = "TreeJSNode";
    }

    var contentContainer = document.createElement("div");
    contentContainer.className = "TreeJSNodeContentContainer"
    domNode.appendChild(contentContainer);

    if(node.text){
        var nodeText = document.createElement("span");
        nodeText.innerHTML = node.text;
        contentContainer.appendChild(nodeText);
    }
    if(node.callback){
        contentContainer.onclick = node.callback;
    }

    var childContainer = document.createElement("div");
    childContainer.className = "TreeJSChildContainer";
    domNode.appendChild(childContainer);

    //console.log(node.children)
    for(var i in node.children){
        var child = node.children[i];
        child.domNode = _createDomTree(child);
        childContainer.appendChild(child.domNode);
    }
    
    return domNode;
}

function addTreeAsChild(tree, parent){
    if(!tree.domNode){
        tree.domNode = _createDomTree(tree.rootNode, isRoot=true);
    }
    parent.appendChild(tree.domNode);

}





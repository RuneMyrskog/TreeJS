// (function(global, document) { 
    //define all default options for a tree
_validateOptions = {
    display: (value) => ['vertical-tree', 'horizontal-tree', 'vertical-navigation', 'horizontal-navigation'].find(displayType => {return value.includes(displayType)}),
    scale: (value) => typeof(value) === "number" && 0 < value && value <= 1,
    globalCallback: (value) => typeof(value) === "function" || value === null
}

_defaultOptions = { 
    display: 'vertical-tree',
    contentBackgroundColor: 'darkorange',
    scale: 1,
    globalCallback: null
}

//throws error for invalid options
function _validateOption(key, option){
    if (_validateOptions[key] && !_validateOptions[key](option)) { // runs validator function for that specific option
        throw new Error(`TreeJS: invalid option passed '{${key}: ${option}}'`)
    }
    if (typeof(_defaultOptions[key]) === "undefined"){
        throw new Error(`TreeJS: no such option '${key}'`)
    }
}

//fills in options object with default options where not already included as a key value pair
function _mergeWithDefaultOptions(options) {
    optionKeys = Object.keys(options)
    defaultOptionKeys = Object.keys(_defaultOptions)
    for(i in optionKeys) {
        key = optionKeys[i]
        _validateOption(key, options[key])
    }
    for(i in defaultOptionKeys){
        key = defaultOptionKeys[i]
        if(!optionKeys.includes(key)) {
            options[key] = _defaultOptions[key] // fill other options with default
        }
    }
}

// modify defaultOptions by replacing defaultOptions key value pairs with options key value pairs
function setTreeJSOptionsDefault(options){
    keys = Object.keys(options)
    for (i in keys) {
        key = keys[i]
        _validate_option(key, options[key]) 
        _defaultOptions[key] = options[key]
    }
}

class TreeNode {
    constructor(id, structure, options){
        this.structure = structure;
        this.id = id;
        this.options = options; 
        this.domNode = null;
        this.visible = true;
        if (["horizontal-tree"].includes(this.options.display)){
            this.displayStyle = "table";
        } else {
            this.displayStyle = "block"
        }


        this.children = [];

        this.content = structure.content

        if('callback' in structure){
            this.callback = structure.callback.bind(this);
        }else{
            this.callback = null;
        }
    }

    collapse(){
        if(!this.domNode){
            throw Error("TreeJS Error: can not collapse a tree that is not in the dom")
        }
        this.visible = false;
        for(var i in this.children){
            
            this.children[i].domNode.style.display = "none";
            this.children[i].collapse();
        }
    }

    expand(){
        this.visible = true;
        for(var i in this.children){
            var child = this.children[i];
            if(child.domNode){                
                child.domNode.style.display = child.displayStyle;
            }
        }
    }

    expandAll(){
        //recursive
        this.expand()
        for (var i in this.children) {
            this.children[i].expandAll();
        }
    }

    removeChild(node){
        if(!this.children.includes(node)){
            throw Error(`TreeJS Error: argument ${node} is not a child of this node`);
        }
        this.children.splice(this.children.indexOf(node), 1) // remove from parent list

        if(node.domNode){
            node.domNode.remove()
        }
    
    }

    addChild(node, index=null){

        index = index || this.children.length - 1
        this.children.splice(index, 0, node)
        if(!node.domNode){
            node.domNode = _createDomTree(node);
        }
        this.domNode.getElementsByClassName("TreeJSChildContainer")[0].appendChild(node.domNode);

    }

}

/* deepCopy function taken from https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089 */
const _deepCopy = (inObject) => {
    let outObject, value, key

    if(typeof(inObject !== "object" || inObject === null)){
        return inObject
    }

    outObject = Array.isArray(inObject) ? [] : {}

    for (key in inObject) {
        value = inObject[key]

        //Recursivley deep copy for nested objects including arrays
        outObject[key] = deepCopy(value)
    }

    return outObject;
}
    
class Tree {
    constructor(rootid, structure, options=_defaultOptions, styles=false){
        this.structure = _deepCopy(structure)
        _mergeWithDefaultOptions(options)
        this.rootNode = new TreeNode(rootid, structure, options);
        for(var child_id in structure){
            var childNode = _createTree(child_id, structure[child_id], options);
            this.rootNode.children.push(childNode);
        }

        this.domNode = null;
    }

    root(i=0){
        return this.rootNode.children[i];
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
    var root = new TreeNode(id, structure, options);

    if('children' in structure){
        for(var child_id in structure.children){
            var childNode = _createTree(child_id, structure.children[child_id], options);
            root.children.push(childNode);
        }
    }
    return root;
    
}

function _createDomTree(node, isRoot=false){
    const {display, contentBackgroundColor, scale, globalCallback} = node.options

    var domNode = document.createElement("div");
    domNode.id = node.id;
    var contentContainer;
    if(isRoot) {
        domNode.className = `TreeJSRootNode ${display || ""}`;

    } else {

        domNode.className = `TreeJSNode ${display || ""}`;
        contentContainer = document.createElement("div");
        contentContainer.className = `TreeJSNodeContentContainer ${display}`
        contentContainer.style.backgroundColor = node.structure.color || contentBackgroundColor;
        if(display.includes("horizontal")){
            tableCell = document.createElement("div")
            tableCell.className = "TreeJSHorizontalTableCell"
            tableCell.appendChild(contentContainer)
            domNode.appendChild(tableCell)
        }else{
            domNode.appendChild(contentContainer);
        }
        
        

        if(node.callback){
            contentContainer.onclick = node.callback;
        } else if (globalCallback) {
            contentContainer.onclick = _deepCopy(globalCallback).bind(node);
        } 

        if (display.includes("navigation")) {
            contentContainer.onclick = () => {
                if(node.callback) {
                    node.callback();
                }
                node.visible ? node.collapse() : node.expand();
            }
        }
    }

    if(typeof(node.content) === "string"){
        var nodeContent = document.createElement("span");
        nodeContent.className = `TreeJSNodeContent ${display}`;
        
        nodeContent.innerHTML = node.content;
        contentContainer.appendChild(nodeContent);
    } else if(node.content instanceof Element) {
        node.content.classList.add("TreeJSNodeContent");
        displayClasses = display.split(" ")
        for(i in displayClasses){
            node.content.classList.add(displayClasses[i])
        }
        contentContainer.appendChild(node.content);
    }


    var childContainer = document.createElement("div");
    childContainer.className = `TreeJSChildContainer ${node.options.display}`;
    domNode.appendChild(childContainer);

    //console.log(node.children)
    for(var i in node.children){
        var child = node.children[i];
        child.domNode = _createDomTree(child);
        if(!isRoot){
            child.domNode.style.transform = `scale(${scale})`   
        }
        childContainer.appendChild(child.domNode);
    }
    
    return domNode;
}

function _addTreeAsChild(tree, parent){
    tree.parentElement = parent;
    if(!tree.domNode){
        tree.domNode = _createDomTree(tree.rootNode, isRoot=true);
    }
    parent.appendChild(tree.domNode);
    
}

function addTreeAsChild(tree, parent){
    if(!(parent instanceof Element)){
        throw Error(`TreeJS Error: no such container ${parent}`)
    }

   _addTreeAsChild(tree, parent)
}


//globally accessible

window.TreeJS = {
    Tree: Tree,
    TreeNode: TreeNode,
    setOptionsDefault: setTreeJSOptionsDefault,
    addTreeAsChild: addTreeAsChild,
}

// })(window, window.document);



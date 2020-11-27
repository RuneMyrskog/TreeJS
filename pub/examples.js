var exampleTreeStructure1 = {
    root: {
        text: "root",
        children: {
            child1: {
                text: "child1",
            },
            child2: {
                text: "child2",
            },
        }
    }
}

var exampleTree1 = new Tree("exampleTree1RootId", exampleTreeStructure1);
var exampleTreeContainer1 = document.getElementById("exampleTreeContainer1");
addTreeAsChild(exampleTree1, exampleTreeContainer1);


var exampleTreeStructure2 = {
    root: {
        text: "root",
        children: {
            child1: {
                text: "child1-PRESSME",
                callback: () => {alert("Pressed child 1")}
            },
            child2: {
                text: "child2-PRESSME",
                callback: () => {alert("Pressed child 2")}
            },
        }
    }
}

var exampleTree2 = new Tree("exampleTree2RootId", exampleTreeStructure2);
var exampleTreeContainer2 = document.getElementById("exampleTreeContainer2");
addTreeAsChild(exampleTree2, exampleTreeContainer2);

var exampleTreeStructure3 = {
    root: {
        text: "root",
        children: {
            child1: {
                text: "child1",
            },
            child2: {
                text: "child2",
            },
        }
    }
}

var exampleTree3 = new Tree("exampleTree3RootId", exampleTreeStructure3);
var exampleTreeContainer3 = document.getElementById("exampleTreeContainer3");
addTreeAsChild(exampleTree3, exampleTreeContainer3);
document.getElementById("myCollapseButton").onclick = () => {exampleTree3.collapse()};
document.getElementById("myExpandButton").onclick = () => {exampleTree3.expand()};

var exampleTreeStructure4 = {
    root: {
        text: "expand me!",
        callback: function () {this.expand()},
        children: {
            child1: {
                text: "collapse me!",
                callback: function() {this.collapse()},
                children: {
                    child11: {text: "child11"},
                    child12: {text: "child12"}
                }
            },
            child2: {
                text: "collapse me!",
                callback: function (){this.collapse()},
                children: {
                    child21: {text: "child21"},
                    child22: {text: "child22"}
                }
            },
        }
    }
}

var exampleTree4 = new Tree("exampleTree4RootId", exampleTreeStructure4);
var exampleTreeContainer4 = document.getElementById("exampleTreeContainer4");
addTreeAsChild(exampleTree4, exampleTreeContainer4);




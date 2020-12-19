var exampleTreeStructure1 = {
    root1: {
        content: "root",
        children: {
            child1: {
                content: "child1",
            },
            child2: {
                content: "child2",
            },
        }
    }
}

var exampleTree1 = new TreeJS.Tree("exampleTree1RootId", exampleTreeStructure1);
var exampleTreeContainer1 = document.getElementById("exampleTreeContainer1");
TreeJS.addTreeAsChild(exampleTree1, exampleTreeContainer1);


var exampleTreeStructure2 = {
    root: {
        content: "root",
        children: {
            child1: {
                content: "child1-PRESSME",
                callback: () => {alert("Pressed child 1")}
            },
            child2: {
                content: "child2-PRESSME",
                callback: () => {alert("Pressed child 2")}
            },
        }
    }
}

var exampleTree2 = new TreeJS.Tree("exampleTree2RootId", exampleTreeStructure2);
var exampleTreeContainer2 = document.getElementById("exampleTreeContainer2");
TreeJS.addTreeAsChild(exampleTree2, exampleTreeContainer2);

var exampleTreeStructure3 = {
    root: {
        content: "root",
        children: {
            child1: {
                content: "child1",
            },
            child2: {
                content: "child2",
            },
        }
    }
}

var exampleTree3 = new TreeJS.Tree("exampleTree3RootId", exampleTreeStructure3);
var exampleTreeContainer3 = document.getElementById("exampleTreeContainer3");
TreeJS.addTreeAsChild(exampleTree3, exampleTreeContainer3);
document.getElementById("myCollapseButton").onclick = () => {exampleTree3.collapse()};
document.getElementById("myExpandButton").onclick = () => {exampleTree3.expandAll()};

var exampleTreeStructure4 = {
    root: {
        content: "expand me!",
        callback: function () {this.expandAll()},
        children: {
            child1: {
                content: "collapse me!",
                callback: function() {this.collapse()},
                children: {
                    child11: {content: "child11"},
                    child12: {content: "child12"}
                }
            },
            child2: {
                content: "collapse me!",
                callback: function (){this.collapse()},
                children: {
                    child21: {content: "child21"},
                    child22: {content: "child22"}
                }
            },
        }
    }
}

var exampleTree4 = new TreeJS.Tree("exampleTree4RootId", exampleTreeStructure4);
var exampleTreeContainer4 = document.getElementById("exampleTreeContainer4");
TreeJS.addTreeAsChild(exampleTree4, exampleTreeContainer4);


var exampleTreeStructure5 = {
    root: {
        content: "root",
        children: {
            child1: {
                content: "child1",
                children: {
                    child11: {content: "child11", color: "lightgreen"},
                    child12: {content: "child12", color: "lightgreen"}
                }
            },
            child2: {
                content: "child2",
                children: {
                    child21: {content: "child21", color: "yellow"},
                    child22: {content: "child22", color: "yellow"}
                }
            },
        }
    }
}

//==========================================================

var exampleTree5Options = {
    display: "horizontal-tree",
    contentBackgroundColor: "lightblue",
}

var exampleTree5 = new TreeJS.Tree("exampleTree4RootId", exampleTreeStructure5, exampleTree5Options);
var exampleTreeContainer5 = document.getElementById("exampleTreeContainer5");
TreeJS.addTreeAsChild(exampleTree5, exampleTreeContainer5);

//============================================================================================
var exampleTreeStructure6 = {
    root: {
        content: "expand me/collapse me",
        children: {
            child1: {
                content: "child1",
                color: "lightgreen",
                children: {
                    child11: {content: "child11", color: "yellow"},
                    child12: {content: "child12", color: "yellow"}
                }
            },
            child2: {
                content: "child2",
                color: "lightgreen",
                children: {
                    child21: {content: "child21", color: "yellow"},
                    child22: {content: "child22", color: "yellow"}
                }
            },
        }
    }
}
var exampleTree6Options = {
    display: "vertical-navigation",
    contentBackgroundColor: "lightblue",
}

var exampleTree6 = new TreeJS.Tree("exampleTree4RootId", exampleTreeStructure6, exampleTree6Options);
var exampleTreeContainer6 = document.getElementById("exampleTreeContainer6");
TreeJS.addTreeAsChild(exampleTree6, exampleTreeContainer6);
exampleTree6.collapse();

var child1Img = document.createElement("img")
child1Img.src = "../images/soccer_ball_cartoon.png"
child1Img.width = 100;

var child2Img = document.createElement("img")
child2Img.src = "../images/soccer_ball_real.png"
child2Img.width =  100;
child2Img.height = 100;

var exampleTreeStructure7 = {
    root: {
        content: "root",
        children: {
            child1: {
                content: child1Img,
            },
            child2: {
                content: child2Img,
            },
        }
    }
}

var exampleTree7 = new TreeJS.Tree("exampleTree7RootId", exampleTreeStructure7);
var exampleTreeContainer7 = document.getElementById("exampleTreeContainer7");
TreeJS.addTreeAsChild(exampleTree7, exampleTreeContainer7);


var exampleTreeStructure8 = {
    root1: {
        content: "root",
        children: {
            child1: {
                content: "child1",
            },
            child2: {
                content: "child2",
            },
        }
    }
}

var exampleTree8 = new TreeJS.Tree("exampleTree8RootId", exampleTreeStructure8);
var exampleTreeContainer1 = document.getElementById("exampleTreeContainer8");
TreeJS.addTreeAsChild(exampleTree8, exampleTreeContainer1);

var rightChild = exampleTree8.root().children[1]
console.log("right child",rightChild)
console.log("root children", exampleTree8.root().children)

document.getElementById("myAddChildButton").onclick = () => {exampleTree8.root().addChild(rightChild)};
document.getElementById("myRemoveChildButton").onclick = () => {exampleTree8.root().removeChild(rightChild)};
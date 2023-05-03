var gettingStartedLink = document.createElement("a");
gettingStartedLink.innerHTML = "Getting Started"
gettingStartedLink.href = "/getting-started"

var examplesLink = document.createElement("a");
examplesLink.innerHTML = "examples"
examplesLink.href = "/Examples"

var docsLink = document.createElement("a");
docsLink.innerHTML = "Documentation"
docsLink.href = "/api"

const mainNavigationTreeStructure = {
    TreeJS: {
        content: "TreeJS",
        children: {
            gettingStarted: {
                content: gettingStartedLink
            },
            api: {
                content: "TreeJS Api",
                children: {
                    examples: {
                        content: examplesLink,
                    },
                    documentation: {
                        content: docsLink
                    }
                }
                
            }
        }
    }
}

var mainNavigationTree = new TreeJS.Tree("mainNavigationTree", mainNavigationTreeStructure, {display: "vertical-tree navigation"});

window.onload = () => {
    var mainNavigationTreeContainer = document.getElementById("mainNavigationTreeContainer");
    TreeJS.addTreeAsChild(mainNavigationTree, mainNavigationTreeContainer);
    mainNavigationTree.collapse()
}





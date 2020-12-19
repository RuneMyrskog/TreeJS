# Tree JS

## landing page url

https://treejs309.herokuapp.com

## copy of getting started section

    To get started using TreeJS API, include these two files in your html head element preceeding scripts which use TreeJS


    <script type="text/javascript" src="https://treejs309.herokuapp.com/pub/Tree.js">
    <link rel="stylesheet" href="https://treejs309.herokuapp.com/pub/Tree.css">
            
In your html file, start by making a container for the Tree you will be creating

```

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <script type="text/javascript" src="https://treejs309.herokuapp.com/pub/Tree.js"/>
        <link rel="stylesheet" href="https://treejs309.herokuapp.com/pub/Tree.css"/>
    </head>
    <body>
        
        <div id="myTreeContainer"></div>
        
    </body>
    </html>

```  
In your js file, define the structure of your Tree

```

    var myTreeStructure = {
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

```    
Now create the Tree, and append it to the DOM

```

    var myTree = new Tree("myTreeRootId", myTreeStructure);
    
    var myTreeContainer = document.getElementById("myTreeContainer");
    addTreeAsChild(myTree, myTreeContainer);
            
```
And thats it! you now have a TreeJS Tree in your DOM, open the html file in your browser to see the result:

## link to documentation

https://treejs309.herokuapp.com/api
UI Framework for HTML5 Canvas
==============================

##Summary
The goal for this project is to provide a set of javascript controls that can be used to write a UI using the HTML canvas. 

###But why? 

For fun and to see what kind of web apps a canvas UI framework would produce. My long term goal is to provide a way to construct sophisticated and pretty animated scenes right in the browser.

###Libraries

I'm using CakeJS (http://code.google.com/p/cakejs/) as a starting point.

###Source Layout

For now I broke up all of the various javascript types into individual files rather than lumping them all into one giant file. (It's a lot easier to debug) There is an ant build script setup to compress and concat all of the javascript files. 

Dev.html is setup to reference all of the individual javascript files. An example using the minimized\combined file is coming.

### Layout Controls

####StackPanel

Used to stack items horizontally or vertically. 

**Example**
<pre><code>var canvas = new Canvas(document.getElementById('drawingCanvas'));
 var stack = new StackPanel({ orientation : '[vertical|horizontal]' });
 canvas.append(stack);
 stack.add(new Circle(20, { fill: 'red', positionTopCenter: true }));
 stack.append(new Circle(20, { fill: 'blue', positionTopCenter: true }));
 stack.append(new TextNode('hello', { color : 'red' }));
 stack.append(new Circle(30, { fill: 'green', positionTopCenter: true }));
</code></pre>

### Canvas UI Controls

####Separator

Used to provide a horizontal line.

**Example**
<pre><code>var canvas = new Canvas(document.getElementById('drawingCanvas'));
 var stack = new StackPanel({ orientation : '[vertical|horizontal]' });
 canvas.append(stack);
 stack.add(new Separator());</code></pre>

### Supported CakeJS Controls

__*NOTE:*__ _These are the controls that have been ported so far. Eventually I'll get to the rest._

####Rectangle

**Example**
<pre><code>var canvas = new Canvas(document.getElementById('drawingCanvas'));
 var stack = new StackPanel({ orientation : '[vertical|horizontal]' });
 canvas.append(stack);
 stack.add(new Rectangle(20, 10, { fill : 'red' }));</code></pre>

####Circle

** New Options**

The circle uses cx and cy parameters as it's center. Sometimes it is easier to just specific the top-left position by setting positionTopCenter to true. (Default is false)

{ positionTopCenter : false }

**Example**
<pre><code>var canvas = new Canvas(document.getElementById('drawingCanvas'));
 var stack = new StackPanel({ orientation : '[vertical|horizontal]' });
 canvas.append(stack);
 stack.add(new Circle(30, { fill : 'blue' }));</code></pre>

####TextNode

The default CakeJS was to draw the text with the current point being at the bottom left. If you are drawing text along along the top of the canvas you can accidentally draw the text entirely off the canvas, appearing like a bug. This TextNode will draw the text like you might expect with the starting point being the top left.

**New Options**

{ color : 'color name or rbg value'}

**Example**
<pre><code>var canvas = new Canvas(document.getElementById('drawingCanvas'));
 var stack = new StackPanel({ orientation : '[vertical|horizontal]' });
 canvas.append(stack);
 stack.add(new TextNode("My Text", { color : 'red' }));</code></pre>
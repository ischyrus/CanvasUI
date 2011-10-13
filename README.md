UI Framework for HTML5 Canvas
==============================

##Summary
The goal for this project is to provide a tool to create UI and animations using the HTML canvas.

###But why? 

For fun and to see what kind of web apps a canvas UI framework would produce. My long term goal is to provide a way to construct sophisticated and pretty animated scenes right in the browser.

###Development

Right now the project is just in the works and I'm exploring the idea more than actively developing something. My initial primary object is to provide a way to build up a tool that allows for an animated scene to be built on the canvas.

###Libraries

I'm using CakeJS (http://code.google.com/p/cakejs/) as a starting point.

###Source Layout

For now I broke up all of the various javascript types into individual files rather than lumping them all into one giant file. (It's a lot easier to debug) There is an ant build script setup to compress and concat all of the javascript files. 

Dev.html is setup to reference all of the individual javascript files. An example using the minimized\combined file is coming.
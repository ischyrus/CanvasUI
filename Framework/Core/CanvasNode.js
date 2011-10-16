/**
 * Created by Steven Schermerhorn.
 * Date: 10/8/11
 * Time: 9:18 PM
 * Copyright 2011 Steven Schermerhorn
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

Klass = function() {
	var c = function() {
   	this.initialize.apply(this, arguments);
    this.typeName = this.ancestors[this.ancestors.length - 1];
  }

  c.ancestors = $A(arguments);
  c.prototype = {};

  for (var i = 0; i < arguments.length; i++) {
    var a = arguments[i];
    if (a.prototype) {
      Object.extend(c.prototype, a.prototype);
    }
		else {
      Object.extend(c.prototype, a);
    }
  }

  Object.extend(c, c.prototype);
  return c;
};

/**
 * @namespace The root CanvasUI namespace.
 */
var UI = {};

/**
  CanvasNode is the base object for all items in CanvasUI.

  The constructor function calls #initialize with its arguments on types
  based on CanvasNode.

  The parameters to CanvasNode have their prototypes or themselves merged with the
  constructor function's prototype.

  Finally, the constructor function's prototype is merged with the constructor
  function. So you can write Shape.getArea.call(this) instead of
  Shape.prototype.getArea.call(this).

  @return Constructor object for CanvasNode
  */
UI.CanvasNode = Klass({
	 ancestors : ['CanvasNode'],

		desiredSize : null,
		width : 0,
		height : 0,

		isVisible : true,
		font : '10px Arial',

		initialize : function(config) {
			if (config) {
				Object.extend(this, config);
			}
		},

		doMeasure : function(w, h) {
			this.desiredSize = this.measure(w, h);
			return this.desiredSize;
		},

		measure : function(w, h) {
			return { width: w, height: h };
		},

		sendHandleFrame : function(ctx, w, h) {
			if (!this.isVisible) {
				return;
			}

			ctx.save();
			ctx.font = this.font;

			this.draw(ctx, w, h);

			ctx.restore();
		}
});
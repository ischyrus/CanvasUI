/**
 * Created by Steven Schermerhorn.
 * Date: 10/8/11
 * Time: 9:18 PM
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
UI.CanvasNode = function() {
  var c = function() {
    this.ancestors = ['CanvasNode'];

		this.initialize.apply(this, arguments);
    this.typeName = this.ancestors[this.ancestors.length - 1];

		this.width = 0;
		this.height = 0;
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
}
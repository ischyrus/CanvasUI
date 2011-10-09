/**
 * StackPanel is used to auto-layout the position of it's children.
 *
 * All children must implement a measure function that returns { width: [value], height: [value] }.
 */
var StackPanel = Klass(CanvasNode, {
	orientation: 'vertical', /* Options are 'vertical' or 'horizontal' */

	initialize : function (config) {
		CanvasNode.initialize.call(this, config);
		this.ancestors.push('StackPanel');
	},

	drawChildren: function(ctx) {
		var isVertical = this.orientation == 'vertical';

		// We have to reverse whatever translations we do
		var translateX = 0;
		var translateY = 0;

		var c = this.__getChildrenCopy()
    this.__zSort(c);
    for(var i=0; i<c.length; i++) {
			var item = c[i];

			item.x += translateX;
			item.y += translateY;
      item.handleDraw(ctx);
			item.x -= translateX;
			item.y -= translateY;

			var length = 0;
			if (item.measure) {
				var measurement = item.measure();
				length = isVertical ? measurement.height : measurement.width;
			}
			else {
				length = isVertical ? item.height : item.width;
			}

			if (isVertical) {
				translateY += length;
			}
			else {
				translateX += length;
			}
    }

		// reverse the translate(s) performed
		this.translate(translateX * -1, translateY * -1);
	}

	//draw : function(ctx) {
	//
	//}
});
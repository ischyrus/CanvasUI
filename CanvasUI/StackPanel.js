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

	drawChildren: function(ctx, width, height) {
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
      var itemSize = item.handleDraw(ctx, (isVertical ? width : Number.NaN), (isVertical ? Number.NaN : height));
			item.x -= translateX;
			item.y -= translateY;

			var length = isVertical ? itemSize.height : itemSize.width;
			if (isVertical) {
				translateY += length;
			}
			else {
				translateX += length;
			}
    }

		if (isVertical) {
			return { width: width, height: translateY };
		}
		else {
			return { width: translateX, height: height };
		}
	}
});
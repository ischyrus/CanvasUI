/**
 * Created by Steven Schermerhorn.
 * Date: 10/9/11
 * Time: 12:43 PM
 */

var Separator = Klass(Rectangle, {
	initialize: function(config) {
		Rectangle.initialize.call(this, 0, 1, config);
		this.ancestors.push('Separator');
	},

	drawGeometry : function(ctx, width, height) {
		this.width = width;
		var result = Rectangle.drawGeometry.call(this, ctx, width, height);
		return result;
	}
});
/**
 * Created by Steven Schermerhorn.
 * Date: 10/11/11
 * Time: 4:55 PM
 */

var Border = Klass(CanvasNode, {
	rect : null,
	initialize: function(content, config) {
		CanvasNode.initialize.call(this, config);
		this.ancestors.push('Border');

		content.x += 1;
		content.y += 1;
		this.append(content);

		// TODO: will it be a problem that this is never appended?
		this.rect = new Rectangle(Number.NaN, Number.NaN, config);
	},

	drawChildren: function(ctx, width, height) {
		var result = CanvasNode.drawChildren.call(this, ctx, width, height);
		result = this.rect.handleDraw(ctx, result.width - 1, result.height - 1);
		return result;
	},

	drawGeometry: function(ctx, width, height) {
		var size = Rectangle.drawGeometry.call(this, ctx, width - 1, height - 1);
		return size;
	}
});
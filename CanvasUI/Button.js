/**
 * Created by Steven Schermerhorn.
 * Date: 10/10/11
 * Time: 12:29 PM
 */

var Button = Klass(CanvasNode, {

	initialize : function(content, config) {
		CanvasNode.initialize.call(this, config);
		this.ancestors.push('Button');

		this.append(content);
	},

	drawChildren : function(ctx, width, height) {
		// The button only allows a single piece of content
		var x = 3;
	}
});
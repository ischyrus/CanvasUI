/**
 * Created by Steven Schermerhorn.
 * Date: 10/16/11
 * Time: 9:44 PM
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

UI.Circle = Klass(UI.CanvasNode, {
	fill: 'transparent',
	stroke: 'transparent',
	radius: 0,
	x: 0,
	y: 0,

	initialize: function(radius, config) {
		UI.CanvasNode.initialize.call(this, config);
		this.ancestors.push('Circle');
	},
	
	/**
	 * Draw a circle on the ctx
	 * @param ctx The context
	 * @param w The amount of width made available
	 * @param h The amount of height made available
	 */
	draw: function(ctx) {
		ctx.fillStyle = this.fill || 'transparent';
		ctx.strokeStyle = this.stroke || 'transparent';

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();

		ctx.fill();
		ctx.stroke();
	},
	/**
	 * Determine if the point x,y are located within the circle.
	 * @param ctx
	 * @param x
	 * @param y
	 */
	hitTest: function(ctx, x, y) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();
		var result = ctx.isPointInPath(x, y);
		return result;
	}
});
/**
 * Created by Steven Schermerhorn.
 * User: stevens
 * Date: 10/15/11
 * Time: 4:21 PM
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

UI.Designer.RectangleDesigner = Klass(UI.CanvasNode, {
	_target: null,

	initialize: function(target, config) {
		UI.CanvasNode.initialize.call(this, config);

		// TODO: It would be nice if this was done in a more abstract way, otherwise every type has to know to do this.
		this.ancestors.push('RectangleDesigner');

		this._target = target;
	},

	measure: function(w, h) {
		return this._target.desiredSize;
	},

	draw: function(ctx, width, height) {
		ctx.translate(1, 1);
		ctx.strokeStyle = UI.Designer.selectorKnobStroke;
		ctx.fillStyle = UI.Designer.selectorKnobFill;

		var x = this._target.x + this._target.width;
		var y = this._target.y + this._target.height;

		ctx.beginPath();
		ctx.arc(this._target.x, this._target.y, UI.Designer.selectorKnobRadius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.beginPath();
		ctx.arc(x, this._target.y, UI.Designer.selectorKnobRadius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.beginPath();
		ctx.arc(x, y, UI.Designer.selectorKnobRadius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this._target.x, y, UI.Designer.selectorKnobRadius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		return this.desiredSize;
	}
});

UI.Designer.RectangleDesigner.designerType = "Rectangle";
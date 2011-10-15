/**
 * Created by Steven Schermerhorn.
 * User: stevens
 * Date: 10/13/11
 * Time: 9:45 PM
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

UI.Rectangle = UI.CanvasNode({
	fill: null,
	radiusX : 0,
	radiusY : 0,
	stroke : null,
	strokeWidth : 0,
	x : 0,
	y : 0,

	initialize : function(width, height, config) {
		// TODO: It would be nice if this config handling was pushed down into CanvasNode.
		if (config) {
				Object.extend(this, config);
		}

		// TODO: It would be nice if this was done in a more abstract way, otherwise every type has to know to do this.
		this.ancestors.push('Rectangle');

		this.width = width;
		this.height = height;
	},

	measure : function(w, h) {
		return { width: this.width, height: this.height };
	},

	draw : function(ctx, w ,h) {
		ctx.strokeWidth = this.strokeWidth;
		if (this.fill) {
			ctx.fillStyle = this.fill;
		}
		if (this.stroke) {
			ctx.strokeStyle = this.stroke;
		}

		var x = this.x;
		var y = this.y;

    if (this.radiusX || this.radiusY) {
      var rx = Math.min(this.width * 0.5, this.radiusX || this.radiusY);
      var ry = Math.min(this.height * 0.5, this.radiusY || rx);
      var k = 0.5522847498;
      var krx = k * rx;
      var kry = k * ry;
      ctx.moveTo(x + rx, y);
      ctx.lineTo(x - rx + this.width, y);
      ctx.bezierCurveTo(x - rx + this.width + krx, y, x + this.width, y + ry - kry, x + this.width, y + ry);
      ctx.lineTo(x + this.width, y + this.height - ry);
      ctx.bezierCurveTo(x + this.width, y + this.height - ry + kry, x - rx + this.width + krx, y + this.height, x - rx + this.width, y + this.height);
      ctx.lineTo(x + rx, y + this.height);
      ctx.bezierCurveTo(x + rx - krx, y + this.height, x, y + this.height - ry + kry, x, y + this.height - ry);
      ctx.lineTo(x, y + ry);
      ctx.bezierCurveTo(x, y + ry - kry, x + rx - krx, y, x + rx, y);
      ctx.closePath();
    }
		else {
      if (this.width < 0) {
				x += this.width;
			}

      if (this.height < 0) {
				y += this.height;
			}
			
      ctx.rect(x, y, Math.abs(this.width), Math.abs(this.height));
    }

		if (this.fill) {
			ctx.fill();
		}
		if (this.stroke || this.strokeWidth) {
			ctx.stroke();
		}
	}
});
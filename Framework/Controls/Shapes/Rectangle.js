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

UI.Rectangle = Klass(UI.CanvasNode, {
	fill: null,
	/*
	 * The radius to put on corners. At the moment the radius must be the same for all corners.
	 */
	cornerRadius : 0,
	stroke : null,
	strokeWidth : 0,
	x : 0,
	y : 0,

	initialize : function(width, height, config) {
		UI.CanvasNode.initialize.call(this, config);

		// TODO: It would be nice if this was done in a more abstract way, otherwise every type has to know to do this.
		this.ancestors.push('Rectangle');

		this.width = width;
		this.height = height;
	},

	measure : function(w, h) {
		return { width: this.width, height: this.height };
	},

	draw : function(ctx, w ,h) {
		ctx.lineWidth = this.strokeWidth;
		ctx.strokeWidth = 1;

		if (this.fill) {
			ctx.fillStyle = this.fill;
		}
		if (this.stroke) {
			ctx.strokeStyle = this.stroke;
		}

		var x = this.x;
		var y = this.y;
		var thisWidth = this.width;
		var thisHeight = this.height;

    if (this.cornerRadius) {
			this.roundedRect(ctx, 20, 20, 100, 100, 6);
    }
		else {
      if (thisWidth < 0) {
				x += thisWidth;
			}

      if (thisHeight < 0) {
				y += thisHeight;
			}
			
      ctx.rect(x, y, Math.abs(thisWidth), Math.abs(thisHeight));
    }

		if (this.fill) {
			ctx.fill();
		}
		if (this.stroke || this.strokeWidth) {
			ctx.stroke();
		}
	},

	roundedRect: function (ctx, x, y, w, h, radius){
		ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.arcTo(x + w, y, x + w, y + radius, radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
    ctx.lineTo(x + radius, y + h);
    ctx.arcTo(x, y + h, x, y + h - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
		ctx.closePath();
	}

});
/**
 * Created by Steven Schermerhorn.
 * Date: 10/11/11
 * Time: 7:57 AM
 */

var SelectionOutline = Klass(Rectangle, {
	dashArray : [5, 4],

	initialize : function(width, height, config) {
		Rectangle.initialize.call(this, width, height, config);
		this.ancestors.push('SelectionOutline');
	},

	drawGeometry : function(ctx, width, height) {
		this.drawDottedLine(ctx, this.cx, this.cy, this.cx + this.width, this.cy);
		this.drawDottedLine(ctx, this.cx + this.width, this.cy, this.cx + this.width, this.cy + this.height);
		this.drawDottedLine(ctx, this.cx, this.cy + this.height, this.cx + this.width, this.cy + this.height);
		this.drawDottedLine(ctx, this.cx, this.cy, this.cx, this.cy + this.height);
		
		return this.measure();
	},

	drawDottedLine : function(ctx, x1, y1, x2, y2) {
		if(!this.dashArray)
			this.dashArray=[10,5];

    var dashCount = this.dashArray.length;
    var dx = (x2 - x1);
    var dy = (y2 - y1);
    var xSlope = (Math.abs(dx) > Math.abs(dy));
    var slope = (xSlope) ? dy / dx : dx / dy;

		ctx.beginPath();
    ctx.moveTo(x1, y1);

    var distRemaining = Math.sqrt(dx * dx + dy * dy);
    var dashIndex = 0;

    while(distRemaining >= 0.1){
        var dashLength = Math.min(distRemaining, this.dashArray[dashIndex % dashCount]);
        var step = Math.sqrt(dashLength * dashLength / (1 + slope * slope));

        if(xSlope){
            if(dx < 0)
							step = -step;
            x1 += step
            y1 += slope * step;
        }
				else{
            if(dy < 0)
							step = -step;
            x1 += slope * step;
            y1 += step;
        }

				if(dashIndex % 2 == 0)
					ctx.lineTo(x1, y1);
				else
					ctx.moveTo(x1, y1);

        distRemaining -= dashLength;
        dashIndex++;
    }

		ctx.closePath();
		ctx.stroke();
	}
});
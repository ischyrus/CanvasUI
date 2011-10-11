/**
 * Created by Steven Schermerhorn.
 * Date: 10/10/11
 * Time: 10:05 PM
 */

var CanvasSurfaceManager = new Klass({
	canvas : null,
	selectionOutline : null,
	selectionStart : [0, 0],

	initialize : function(canvas, config) {
		this.canvas = canvas;
		this.ancestors.push('CanvasSurfaceManager');
	},

	handleMouseDown : function(x, y) {

	},

	handleMouseMove : function(x, y) {

	},

	handleMouseUp : function(x, y) {

	},

	handleMouseClick : function(x, y) {

	},

	removeSelection : function() {
		if(!this.selectionOutline)
			return;

		this.canvas.remove(this.selectionOutline);
		this.selectionOutline = null;
	},

	updateSelection : function(position) {
		var distance = [Math.abs(position[0] - this.selectionStart[0]), Math.abs(position[1] - this.selectionStart[1])];
		if(distance[0] < 5 && distance[1] < 5)
			return;

		if(!this.selectionOutline) {
			this.selectionOutline = new SelectionOutline(distance[0], distance[1]);
			this.canvas.append(this.selectionOutline);
		}

		var left = Math.min(position[0], this.selectionStart[0]) - 0.5;
		var top = Math.min(position[1], this.selectionStart[1]) - 0.5;

		this.selectionOutline.cx = left;
		this.selectionOutline.cy = top;
		this.selectionOutline.width = distance[0] + 1;
		this.selectionOutline.height = distance[1] + 1;
	},

	wireupCanvasEvents : function(canvas) {
		canvas.addEventListener('mousedown', (function(evt) {
			this.removeSelection();
			this.selectionStart = [evt.layerX, evt.layerY];
		}).bind(this), false);

		canvas.addEventListener('mousemove', (function(evt) {
			var isMouseDown = evt.which == 1;
			if(isMouseDown && this.selectionStart) {
				this.updateSelection([evt.layerX, evt.layerY]);
			}
		}).bind(this), false);

		canvas.addEventListener('mouseup', (function(evt) {
			this.selectionStart = null;
		}).bind(this), false);

		canvas.addEventListener('click', (function(evt) {

		}).bind(this), false);
	}
});
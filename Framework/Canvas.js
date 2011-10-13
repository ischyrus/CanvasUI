/**
 * Created by JetBrains WebStorm.
 * User: sscherm
 * Date: 10/12/11
 * Time: 9:56 PM
 * To change this template use File | Settings | File Templates.
 */

UI.Canvas = UI.CanvasNode({
	divId : null,

	clear : true,
  frameLoop : false,
  recording : false,
  opacity : 1,
  frame : 0,
  elapsed : 0,
  frameDuration : 30,
  speed : 1.0,
  time : 0,
  fps : 0,
  currentRealFps : 0,
  currentFps : 0,
  fpsFrames : 30,
  startTime : 0,
  realFps : 0,
  fixedTimestep : false,
  playOnlyWhenFocused : true,
  isPlaying : true,
  redrawOnlyWhenChanged : false,
  changed : true,
  drawBoundingBoxes : false,
  cursor : 'default',

  mouseDown : false,
  mouseEvents : [],

  absoluteMouseX : null,
  absoluteMouseY : null,

  mouseX : null,
  mouseY : null,

  elementNodeZIndexCounter : 0,

	initialize : function(container, divId, w, h, config) {
		// TODO: It would be nice if the config was extended into the object in CanvasNode.
		if (config) {
			Object.extend(this, config);
		}

		this.ancestors.push('Canvas');

		this.divId = divId;

		var canvas = E.canvas(w, h);
		var canvasContainer = E('div', canvas, {
			style: {
				overflow: 'hidden',
				width: w + 'px',
				height: h + 'px',
				position: 'relative'
			}
		});
		canvasContainer.id = this.divId;
		this.canvasContainer = canvasContainer;

		if (container) {
			container.appendChild(canvasContainer);
		}

		this.mouseEventStack = [];
    this.canvas = canvas;
    canvas.canvas = this;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    var th = this;
		this.frameHandler = function() {
			th.onFrame();
		};

    if (this.canvas.parentNode) {
			this.addEventListeners();
		}

    this.startTime = new Date().getTime();

    //if (this.isPlaying) {
    //  this.play();
		//}
	},

	addEventListeners : function() {
	}
});
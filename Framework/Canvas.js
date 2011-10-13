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
	/*
	 * The callback loop function for invoking onFrame when appropriate.
	 */
  _frameLoop : null,
  opacity : 1,
	/*
	 * The number of frames processed so far
	 */
  _frame : 0,
	/*
	 * The cummulative amount of time, reset every X number of frames
	 * where X is the value of fpsFrames.
	 */
  _elapsed : 0,
	/*
	 * If true, frameDuration is asserted to be the amount of time between each frame rather than
	 * using the actual time.
	 */
	fixedTimestep : false,
	/*
	 * If fixedTimestep is true, this value is used as the amount of time between frames rather than
	 * the actual ellapsed amount of time.
	 */
  frameDuration : 30,
	/*
	 * The average FPS over the last X number of frames
	 * where X is the value of fpsFrames.
	 */
  fps : 0,
	/*
	 * The amount of time it took to process the last frame
	 */
	currentElapsed : 0,
	/*
	 * The calculated FPS averaged off of the last few frames.
	 */
  currentRealFps : 0,
	/*
	 * Indicates the FPS based solely off of the last two frames and including the rendering of both.
	 */
  currentFps : 0,
	/*
	 * The number of frames in a second. (Perhaps this shouldn't be hard coded?)
	 * Essentially this is used to indicate when fps should be updated.
	 * In this case, every 30 frames the metrics for FPS calculations will be reset.
	 */
  fpsFrames : 30,
	/*
	 * Timestamp indicating the start. This value is used in conjunction with fpsFrames to
	 * calculated the average FPS over a period of time.
	 */
  _startTime : 0,
  realFps : 0,
  isPlaying : true,

	/*
	 * An internal value. A timestamp marking the start of the last frame.
	 */
	_realTime: 0,
	/*
	 * An internal value. The amount of time delay between the start of the last two frames.
	 */
	_currentRealElapsed: 0,
	/*
	 * The underlying context for the canvas.
	 */
	_context: null,

	initialize : function(container, divId, w, h, config) {
		// TODO: It would be nice if this config handling was pushed down into CanvasNode.
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

    this._startTime = new Date().getTime();

    if (this.isPlaying) {
      this.play();
		}
	},

	createFrameLoop : function() {
    var self = this;
    var fl = {
      running : true,
      stop : function() {
        this.running = false;
      },
      run : function() {
        if (fl.running) {
          self.onFrame();
          requestAnimFrame(fl.run, self.canvas);
        }
      }
    };
    requestAnimFrame(fl.run, this.canvas);
    return fl;
  },

	addEventListeners : function() {
	},

	play : function() {
		this.stop();
		this._realTime = new Date().getTime();
		this._frameLoop = this.createFrameLoop();
	},

	stop : function() {
		if (this._frameLoop) {
			this._frameLoop.stop();
			this._frameLoop = null;
		}

		this.isPlaying = false;
	},

	getContext : function() {
		if (this._context) {
			this._context = this.canvas.getContext('2d');
		}

		return this._context;
	},

	onFrame : function() {
		var context = this.getContext();
		try {
			var realTime = new Date().getTime();
			this._currentRealElapsed = (realTime - this._realTime);
			this.currentRealFps = 1000 / this._currentRealElapsed;
			var timeDelta = (this.fixedTimestep) ? this.frameDuration : this._currentRealElapsed;
			this._realTime = realTime;
			this._time += timeDelta;

			// TODO: Add the Measure\Arrange\Render pass here

			this.currentElapsed = (new Date().getDate() - this._realTime);
			this._elapsed += this.currentElapsed;
			this.currentFps = 1000 / this.currentElapsed;
			this._frame += 1;

			if (this._frame % this.fpsFrames == 0) {
				this.fps = this.fpsFrames * 1000 / this._elapsed;
				this.realFps = this.fpsFrames * 1000 / (new Date.getTime() - this._startTime);
				this._elapsed = 0;
				this._startTime = new Date().getTime();
			}
		}
		catch(e) {
			console.log(e);
		}
	}
});
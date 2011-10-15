/**
 * Created by Steven Schermerhorn
 * Date: 10/12/11
 * Time: 9:56 PM
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

UI.Canvas = UI.CanvasNode({
	/*
	 * The id used for the div containing the canvas.
	 */
	divId : null,
	/*
	 * The content that will be rendered in the canvas.
	 */
	content: null,
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
	 * The number of frames to average things over.
	 * Essentially this is used to indicate when fps should be updated.
	 * In this case, every 30 frames the metrics for FPS calculations will be reset.
	 */
  fpsFrames : 30,
	/*
	 * Timestamp indicating the start. This value is used in conjunction with fpsFrames to
	 * calculated the average FPS over a period of time.
	 */
  _startTime : 0,
	/*
	 * The frames per second averaged over the number of frames set by fpsFrames and the amount
	 * of time it took start to end.
	 */
  realFps : 0,
	/*
	 * Indicates if the frame callback is looping.
	 */
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

	initialize : function(container, divId, w, h, content, config) {
		// TODO: It would be nice if this config handling was pushed down into CanvasNode.
		if (config) {
				Object.extend(this, config);
		}

		// TODO: It would be nice if this was done in a more abstract way, otherwise every type has to know to do this.
		this.ancestors.push('Canvas');

		this.divId = divId;
		this.content = content;

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
			// TODO: Add event handlers to the div containing the canvas.
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
		if (!this._context) {
			this._context = this.canvas.getContext('2d');
		}

		return this._context;
	},

	preHandleFrame : function() {
		var realTime = new Date().getTime();
		this._currentRealElapsed = (realTime - this._realTime);
		this.currentRealFps = 1000 / this._currentRealElapsed;
		var timeDelta = (this.fixedTimestep) ? this.frameDuration : this._currentRealElapsed;
		this._realTime = realTime;
		this._time += timeDelta;

		this.doMeasure(this.width, this.height);
	},

	draw : function(ctx, w, h){
		ctx.clearRect(0, 0, w, h);

		// If you are drawing a line at (0,0) you'll have an issue with the line not being crisp.
		// To draw a line on the 0th pixel the coordinates actually need to be (0.5, 0.5).
		// Rather than having to remember this and adding 0.5 to everything the canvas will
		// translate the coordinates up front and it will be applied to everything within it.
		ctx.translate(0.5, 0.5);

		if (this.content) {
			this.content.draw(ctx, w, h);
		}

		var fpsOutput = 'fps: ' + this.fps.toFixed(2) + ' real fps: ' + this.realFps.toFixed(2);

		ctx.fillStyle = 'Black';
		ctx.fillRect(5, 7, ctx.measureText(fpsOutput).width, 10);
		ctx.fillStyle = '#ff00ff';
		ctx.fillText(fpsOutput, 5, 15, null);


		// The canvas will always be the size it was created at.
		return {
			width: this.width,
			height: this.height
		};
	},

	measure : function(w, h) {
		if (this.content) {
			return this.content.measure(w, h);
		}
		
		// The canvas will always be the size it was created at.
		return {
			width: this.width,
			height: this.height
		};
	},

	postHandleFrame : function() {
		this.currentElapsed = (new Date().getTime() - this._realTime);
		this._elapsed += this.currentElapsed;
		this.currentFps = 1000 / this.currentElapsed;
		this._frame += 1;

		if (this._frame % this.fpsFrames == 0) {
			this.fps = this.fpsFrames * 1000 / this._elapsed;
			this.realFps = this.fpsFrames * 1000 / (new Date().getTime() - this._startTime);
			this._elapsed = 0;
			this._startTime = new Date().getTime();
		}
	},

	onFrame : function() {
		var context = this.getContext();
		try {
			this.preHandleFrame();
			this.sendHandleFrame(context, this.desiredSize.width, this.desiredSize.height);
			this.postHandleFrame();
		}
		catch(e) {
			console.log(e);
		}
	}
});
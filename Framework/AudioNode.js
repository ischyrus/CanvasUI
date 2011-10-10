/**
 * Created by Steven Schermerhorn.
 * Date: 10/8/11
 * Time: 9:29 PM
 */

/**
  AudioNode is a CanvasNode used to play a sound.

  */
AudioNode = Klass(CanvasNode, {
  ready : false,
  autoPlay : false,
  playing : false,
  paused : false,
  pan : 0,
  volume : 1,
  loop : false,

  transformSound : false,

  initialize : function(filename, params) {
    CanvasNode.initialize.call(this, params)
    this.ancestors.push("AudioNode")
    this.filename = filename
    this.when('load', this._autoPlaySound)
    this.loadSound()
  },

  loadSound : function() {
    this.sound = CanvasSupport.getSoundObject()
    if (!this.sound) return
    var self = this
    this.sound.onready = function() {
      self.ready = true
      self.root.dispatchEvent({type: 'ready', canvasTarget: self})
    }
    this.sound.onload = function() {
      self.loaded = true
      self.root.dispatchEvent({type: 'load', canvasTarget: self})
    }
    this.sound.onerror = function() {
      self.root.dispatchEvent({type: 'error', canvasTarget: self})
    }
    this.sound.onfinish = function() {
      if (self.loop) self.play()
      else self.stop()
    }
    this.sound.load(this.filename)
  },

  play : function() {
    this.playing = true
    this.needPlayUpdate = true
  },

  stop : function() {
    this.playing = false
    this.needPlayUpdate = true
  },

  pause : function() {
    if (this.needPauseUpdate) {
      this.needPauseUpdate = false
      return
    }
    this.paused = !this.paused
    this.needPauseUpdate = true
  },

  setVolume : function(v) {
    this.volume = v
    this.needStatusUpdate = true
  },

  setPan : function(p) {
    this.pan = p
    this.needStatusUpdate = true
  },

  handleUpdate : function() {
    CanvasNode.handleUpdate.apply(this, arguments)
    if (this.willBeDrawn) {
      this.transform(null, true)
      if (!this.sound) this.loadSound()
      if (this.ready) {
        if (this.transformSound) {
          var x = this.currentMatrix[4]
          var y = this.currentMatrix[5]
          var a = this.currentMatrix[2]
          var b = this.currentMatrix[3]
          var c = this.currentMatrix[0]
          var d = this.currentMatrix[1]
          var hw = this.root.width * 0.5
          var ys = Math.sqrt(a*a + b*b)
          var xs = Math.sqrt(c*c + d*d)
          this.setVolume(ys)
          this.setPan((x - hw) / hw)
        }
        if (this.needPauseUpdate) {
          this.needPauseUpdate = false
          this._pauseSound()
        }
        if (this.needPlayUpdate) {
          this.needPlayUpdate = false
          if (this.playing) this._playSound()
          else this._stopSound()
        }
        if (this.needStatusUpdate) {
          this._setSoundVolume()
          this._setSoundPan()
        }
      }
    }
  },

  _autoPlaySound : function() {
    if (this.autoPlay) this.play()
  },

  _setSoundVolume : function() {
    this.sound.setVolume(this.volume)
  },

  _setSoundPan : function() {
    this.sound.setPan(this.pan)
  },

  _playSound : function() {
    if (this.sound.play() == false)
      return this.playing = false
    this.root.dispatchEvent({type: 'play', canvasTarget: this})
  },

  _stopSound : function() {
    this.sound.stop()
    this.root.dispatchEvent({type: 'stop', canvasTarget: this})
  },

  _pauseSound : function() {
    this.sound.pause()
    this.root.dispatchEvent({type: this.paused ? 'pause' : 'play', canvasTarget: this})
  }
})

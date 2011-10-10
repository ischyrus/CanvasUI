/**
 * Created by Steven Schermerhorn.
 * Date: 10/8/11
 * Time: 9:14 PM
 */

/**
  Shortcut for document.createTextNode.

  @param {String} text The text for the text node
  @return The created text node
  */
T = function(text) {
  return document.createTextNode(text)
}

/**
  TextNode is used for drawing text on a canvas.

  Attributes:

    text - The text string to draw.
    align - Horizontal alignment for the text.
            'left', 'right', 'center', 'start' or 'end'
    baseline - Baseline used for the text.
               'top', 'hanging', 'middle', 'alphabetic', 'ideographic' or 'bottom'
    asPath - If true, creates a text path instead of drawing the text.
    pathGeometry - A geometry object the path of which the text follows.

  Example:

    var text = new TextGeometry('The cake is a lie.')

  @param text The text string to draw.
  @param config Optional config hash.
  */
TextNode = Klass(Drawable, {
	color: 'black',
  text : 'Text',
  align : 'start', // 'left' | 'right' | 'center' | 'start' | 'end'
  baseline : 'top', // 'top' | 'hanging' | 'middle' | 'alphabetic' |
                           // 'ideographic' | 'bottom'
  accuratePicking : false,
  asPath : false,
  pathGeometry : null,
  maxWidth : null,
  width : 0,
  height : 20,
  cx : 0,
  cy : 0,

  __drawMethodName : 'draw' + CanvasSupport.getTextBackend(),
  __pickingMethodName : 'drawPickingPath' + CanvasSupport.getTextBackend(),

  initialize : function(text, config) {
    this.lastText = this.text
    this.text = text
    Drawable.initialize.call(this, config)
    this.ancestors.push("TextNode")
  },

  drawGeometry : function(ctx, width, height) {
		ctx.fillStyle = this.color;
    return this.drawUsing(ctx, this.__drawMethodName, width, height)
  },

  drawPickingPath : function(ctx) {
    this.drawUsing(ctx, this.__pickingMethodName)
  },

  drawUsing : function(ctx, methodName, width, height) {
    if (!this.text || this.text.length == 0)
      return { width: 0, height: 0 }
    if (this.lastText != this.text || this.lastStyle != ctx.font) {
      this.dimensions = this.measureText(ctx)
      this.lastText = this.text
      this.lastStyle = ctx.font
    }

		if (this[methodName])
      this[methodName](ctx, width, height)

		return this.measureText(ctx);
  },

  measureText : function(ctx) {
    var mn = 'measureText' + CanvasSupport.getTextBackend().capitalize()
    if (this[mn]) {
      return this[mn](ctx)
    } else {
      return {width: 0, height: 0}
    }
  },

  computeXForAlign : function() {
    if (this.align == 'left') // most hit branch
      return 0
    else if (this.align == 'right')
      return -this.dimensions.width
    else if (this.align == 'center')
      return  -this.dimensions.width * 0.5
  },

  measureTextHTML5 : function(ctx) {
    // FIXME measureText is retarded
    ctx.save()
    if (this.font)
      ctx.font = this.font

		var regex = new RegExp("[0-9]+", 'i');
		var extractedHeight = parseInt(regex.exec(ctx.font) || '20');

    var measurements = ctx.measureText(this.text)
    var result = { width: measurements.width, height: extractedHeight }
    ctx.restore()

    return result;
  },

  drawHTML5 : function(ctx, width, height) {
		var regex = new RegExp("[0-9]+", 'i');
		var extractedHeight = parseInt(regex.exec(ctx.font) || '20');
		var y = this.cy + extractedHeight;

    if (this.align == 'center' && this.dimensions.width < width) {
      ctx.fillText(this.text, (width / 2) - (this.dimensions.width / 2), y, this.maxWidth);
    }
    else {
      ctx.fillText(this.text, this.cx, y, this.maxWidth)
    }
  },

  drawPickingPathHTML5 : function(ctx) {
    var ascender = 15 // this.dimensions.ascender
    var ry = this.cy - ascender
    ctx.rect(this.cx, ry, this.dimensions.width, this.dimensions.height)
  },

  measureTextMozText : function(ctx) {
    return {width: ctx.mozMeasureText(this.text), height: 20}
  },

  drawMozText : function(ctx) {
    var x = this.cx + this.computeXForAlign()
    var y = this.cy + 0
    if (this.pathGeometry) {
      this.pathGeometry.draw(ctx)
      ctx.mozDrawTextAlongPath(this.text, this.path)
    } else {
      ctx.save()
      ctx.translate(x,y)
      if (this.asPath) {
        ctx.mozPathText(this.text)
      } else {
        ctx.mozDrawText(this.text)
      }
      ctx.restore()
    }
  },

  drawPickingPathMozText : function(ctx) {
    var x = this.cx + this.computeXForAlign()
    var y = this.cy + 0
    if (this.pathGeometry) { // FIXME how to draw a text path along path?
        this.pathGeometry.draw(ctx)
        // ctx.mozDrawTextAlongPath(this.text, this.path)
    } else if (!this.accuratePicking) {
      var ascender = 15 // this.dimensions.ascender
      var ry = y - ascender
      ctx.rect(x, ry, this.dimensions.width, this.dimensions.height)
    } else {
      ctx.save()
      ctx.translate(x,y)
      ctx.mozPathText(this.text)
      ctx.restore()
    }
  },

  drawDrawString : function(ctx) {
    var x = this.cx + this.computeXForAlign()
    var y = this.cy + 0
    ctx.drawString(x,y, this.text)
  },

  measureTextPerfectWorld : function(ctx) {
    return ctx.measureText(this.text)
  },

  drawPerfectWorld : function(ctx) {
    if (this.pathGeometry) {
      this.pathGeometry.draw(ctx)
      if (this.asPath)
        ctx.pathTextAlongPath(this.text)
      else
        ctx.drawTextAlongPath(this.text)
    } else if (this.asPath) {
      ctx.pathText(this.text)
    } else {
      ctx.drawText(this.text)
    }
  },

  drawPickingPathPerfectWorld : function(ctx) {
    if (this.accuratePicking) {
      if (this.pathGeometry) {
        ctx.pathTextAlongPath(this.text)
      } else {
        ctx.pathText(this.text)
      }
    } else { // creates a path of text bounding box
      if (this.pathGeometry) {
        ctx.textRectAlongPath(this.text)
      } else {
        ctx.textRect(this.text)
      }
    }
  }
})
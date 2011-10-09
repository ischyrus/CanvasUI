/**
 * Created by Steven Schermerhorn.
 * Date: 10/8/11
 * Time: 9:28 PM
 */

/**
  Hacky link class for emulating <a>.

  The correct way would be to have a real <a> under the cursor while hovering
  this, or an imagemap polygon built from the clipped subtree path.

  @param href Link href.
  @param target Link target, defaults to _self.
  @param config Optional config hash.
  */
LinkNode = Klass(CanvasNode, {
  href : null,
  target : '_self',
  cursor : 'pointer',

  initialize : function(href, target, config) {
    this.href = href
    if (target)
      this.target = target
    CanvasNode.initialize.call(this, config)
    this.ancestors.push("LinkNode")
    this.setupLinkEventListeners()
  },

  setupLinkEventListeners : function() {
    this.addEventListener('click', function(ev) {
      if (ev.button == Mouse.RIGHT) return
      var target = this.target
      if ((ev.ctrlKey || ev.button == Mouse.MIDDLE) && target == '_self')
        target = '_blank'
      window.open(this.href, target)
    }, false)
  }
})
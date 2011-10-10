/**
 * Created by Steven Schermerhorn.
 * Date: 10/8/11
 * Time: 9:16 PM
 */
if (!window.Mouse) Mouse = {}
/**
  Returns the coordinates for a mouse event relative to element.
  Element must be the target for the event.

  @param element The element to compare against
  @param event The mouse event
  @return An object of form {x: relative_x, y: relative_y}
  */
Mouse.getRelativeCoords = function(element, event) {
  var xy = {x:0, y:0}
  var osl = 0
  var ost = 0
  var el = element
  while (el) {
    osl += el.offsetLeft
    ost += el.offsetTop
    el = el.offsetParent
  }
  xy.x = event.pageX - osl
  xy.y = event.pageY - ost
  return xy
}

Mouse.LEFT = 0
Mouse.MIDDLE = 1
Mouse.RIGHT = 2

if (Browser == 'IE') {
  Mouse.LEFT = 1
  Mouse.MIDDLE = 4
}
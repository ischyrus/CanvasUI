/**
 * Created by Steven Schermerhorn.
 * Date: 10/8/11
 * Time: 9:16 PM
 */

Browser = (function(){
  var ua = window.navigator.userAgent
  var khtml = ua.match(/KHTML/)
  var gecko = ua.match(/Gecko/)
  var webkit = ua.match(/WebKit\/\d+/)
  var ie = ua.match(/Explorer/)
  if (khtml) return 'KHTML'
  if (gecko) return 'Gecko'
  if (webkit) return 'Webkit'
  if (ie) return 'IE'
  return 'UNKNOWN'
})()
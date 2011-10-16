/**
 * Created by Steven Schermerhorn.
 * User: stevens
 * Date: 10/15/11
 * Time: 5:28 PM
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
/**
 * Creates a new UI.Panel.
 * @class UI.Panel is used to draw multiple items as added without any special layout handling.
 */
UI.Panel = Klass(UI.CanvasNode, {
	_children: [],
	/**
	 * Constructor for UI.Panel.
	 * @param config
	 */
	initialize: function(config) {
		UI.CanvasNode.initialize.call(this, config);
		this.ancestors.push('Panel');
	},
	/**
	 * Add a child to the panel
	 * @param {UI.CanvasNode} child The child to add.
	 */
	addChild: function(child) {
		this._children.push(child);
	},
	/**
	 * Draw all the children in the canvas.
	 * @param ctx The context
	 * @param width 
	 * @param height
	 */
	draw: function(ctx, width, height) {
		for (var i = 0; i < this._children.length; i++) {
			this._children[i].sendHandleFrame(ctx, width, height);
		}
		return this.desiredSize;
	}
});
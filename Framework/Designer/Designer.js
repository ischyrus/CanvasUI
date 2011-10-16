/**
 * Created by Steven Schermerhorn.
 * User: stevens
 * Date: 10/15/11
 * Time: 4:05 PM
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
 * @namespace Holds all functionality around controls for displaying adornments for CanvasNode manipulation.
 */
UI.Designer = {};

UI.Designer.Designer = Klass(UI.Canvas, {
	_designers: [],
	_panel: null,
	_target: null,
	/**
	 *
	 * @param container
	 * @param canvas
	 * @param config
	 */
	initialize: function(container, canvas, config) {
		this._panel = new UI.Panel(null);
		this._target = canvas;
		UI.Canvas.initialize.call(this, container, canvas.divId + '_designer', canvas.width + 2, canvas.height + 2, this._panel, config);

		// TODO: It would be nice if this was done in a more abstract way, otherwise every type has to know to do this.
		this.ancestors.push('Designer');
		this.createDesigners();
	},
	/**
	 * Generates a designer for each element in the target canvas.
	 */
	createDesigners: function() {
		var designerMap = this.discoverDesigners();

		var items = [this._target];

		while (this._target.length > 0) {
			var target = this._target.pop();
			var designerType = designerMap[target.typeName];
			if (designerType) {
				var designer = new designerType(target, null);
				this._designers.push(designer);
				this._panel.addChild(designer);

				// If the target of a designer has children it should make the available via a getChildren function.
				if (designer.getChildren) {
					for (var child in designer.getChildren()) {
						items.push(child);
					}
				}
			}
		}
	},
	/**
	 * Scan the UI.Designer namespace for decorators.
	 * @returns {Object} An object with keys being the typeName of supported CanvasNode.
	 */
	discoverDesigners: function() {
		var designerMap = {};

		var designerNamespace = UI.Designer;
		for (var type in designerNamespace){
			if (!(typeof designerNamespace[type] == 'function')) {
				continue;
			}

			var func = designerNamespace[type];
			// DesignerType indicates which type the item is for.
			if (!func.designerType) {
				continue;
			}

			designerMap[func.designerType] = func;
		}

		return designerMap;
	}
});
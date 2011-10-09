var ElementTree = Klass(CanvasNode, { 
	rootElement: null,
	
	initialize : function (rootElement, config) {
		CanvasNode.initialize.call(this, config);
		this.ancestors.push("ElementTree");
		
		this.rootElement = rootElement;

		var bg = new Rectangle(this.width, this.height, config);
		this.append(bg);

		var title = new TextNode("Elements", { 
			align: 'center',
			cx: 0,
			cy: 25,
			fill: 'black',
			width: this.width,
			height: 24,
			font: '24px Arial'
		});
		this.append(title);

		this.addFrameListener(function(t, dt) {
			if(this.root == null)
				return;

			bg.width = this.root.width;
			bg.height = this.root.height;
		});
	}
});
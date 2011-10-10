var ElementTree = Klass(StackPanel, {
	rootElement: null,
	
	initialize : function (rootElement, config) {
		StackPanel.initialize.call(this, config);
		this.ancestors.push("ElementTree");
		
		this.rootElement = rootElement;

		this.append(new TextNode("Elements", {  align: 'center', font: '24px Arial' }));
		this.append(new Separator( { fill : 'LightGray', cy: 6 }));
		this.append(new Separator( { fill : 'Gray'}));
		this.append(new Separator( { fill : 'LightGray' }));
	},

	draw : function(ctx, width, height) {
		ctx.save();
		
		ctx.fillStyle = '#EEEEEE';
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(width, 0);
		ctx.lineTo(width, height);
		ctx.lineTo(0, height);
		ctx.closePath();
		ctx.fill();

		ctx.restore();

		return { width: width, height: height };
	}
});
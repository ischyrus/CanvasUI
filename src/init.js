var ca = {};

ca.init = function() {
  var cake = new Canvas(document.getElementById('drawingCanvas'));

	var stack = new StackPanel();
	stack.append(new Circle(20, { fill: 'red', positionTopCenter: true }));
	stack.append(new Circle(20, { fill: 'blue', positionTopCenter: true }));
	stack.append(new TextNode('hello', { color : 'red' }));
	stack.append(new Circle(30, { fill: 'green', positionTopCenter: true }));
	cake.append(stack);

  var elementTreeCanvasDom = document.getElementById('leftColumn');
  var elementTreeCanvas = new Canvas(elementTreeCanvasDom);
  var elementTree = new ElementTree(cake, { fill: '#f5f5f5' });
	elementTreeCanvas.append(elementTree);
};

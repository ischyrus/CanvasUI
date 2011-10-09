var ca = {};

ca.init = function() {
  var cake = new Canvas(document.getElementById('drawingCanvas'));

  var node1 = new CanvasNode({ x: 100, y: 100 });

  var outline = new Rectangle(400, 400, { stroke: 'blue' });
  var rect = new Rectangle(100, 100, { fill : 'red' });
  var rect2 = new Rectangle(100, 100, { fill : 'green' });
	var circ1 = new Circle(20, { fill : 'yellow', positionTopCenter : true });
	var circ2 = new Circle(10, { fill : 'blue', positionTopCenter : true });
	var stack = new StackPanel();
	stack.append(circ1);
	stack.append(circ2);

  cake.append(outline);
  cake.append(rect2);
  node1.append(rect);
	node1.append(stack);
  cake.append(node1);

  var elementTreeCanvasDom = document.getElementById('leftColumn');
  elementTreeCanvasDom.width = elementTreeCanvasDom.offsetWidth;
  elementTreeCanvasDom.height = elementTreeCanvasDom.offsetHeight;
  var elementTreeCanvas = new Canvas(elementTreeCanvasDom);
  var elementTree = new ElementTree(cake, {
    fill: '#f5f5f5',
    width: elementTreeCanvasDom.offsetWidth,
    height: elementTreeCanvasDom.offsetHeight
  });

  elementTreeCanvas.append(elementTree);
}

window.onload = function() {
  ca.init();
}

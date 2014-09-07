function Sketchpad(config) {

  // Warn the user if no DOM element was selected
  if (!config.hasOwnProperty('element')) {
    console.error('SKETCHPAD ERROR: No element selected');
    return;
  }

  this.element = config.element;

  // Width can be defined on the HTML or programatically
  var width = config.width || $(element).attr('data-width') || 0;
  var height = config.height || $(element).attr('data-height') || 0;

  this.color = config.color || $(element).attr('data-color') || '#000000';
  this.penSize = config.penSize || $(element).attr('data-penSize') || 5;

  //
  // Private API
  //

  var cursorPosition = function(event) {
    return {
      x: event.pageX - this.canvas.offsetLeft,
      y: event.pageY - this.canvas.offsetTop,
    };
  };

  var cursorMove = function(event) {
    var currentPosition = cursorPosition(event);

    draw(this._lastPosition, currentPosition, this.color, this.penSize);

    this._lastPosition = currentPosition;
  };

  var draw = function(start, end, color, size) {
    this.context.save();

    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
    this.context.strokeStyle = color;
    this.context.lineWidth = size;

    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.closePath();
    this.context.stroke();

    this.context.restore();
  };

  //
  // Public API
  //

  this.reset = function() {
    // Set attributes
    this.canvas = $(this.element)[0];
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');

    // Setup event listeners
    var view = this;
    var callback = cursorMove.bind(this);
    this.canvas.addEventListener('mousedown', function(event) {
      view._lastPosition = cursorPosition(event);
      view.canvas.addEventListener('mousemove', callback);
    });
    this.canvas.addEventListener('mouseout', function(event) {
      view.canvas.removeEventListener('mousemove', callback);
    });
    this.canvas.addEventListener('mouseup', function(event) {
      view.canvas.removeEventListener('mousemove', callback);
    });
  };

  this.reset();
}

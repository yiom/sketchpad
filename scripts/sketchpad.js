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

  //
  // Private API
  //

  var cursorPosition = function(event) {
    return {
      x: event.pageX - this.canvas.offsetLeft,
      y: event.pageY - this.canvas.offsetTop,
    };
  }

  var cursorMove = function(event) {
    console.log(cursorPosition(event));
  }

  //
  // Public API
  //

  this.reset = function() {
    // Set attributes
    this.canvas = $(this.element)[0];
    this.canvas.width = width;
    this.canvas.height = height;
    this.content = this.canvas.getContext('2d');

    // Setup event listeners
    var view = this;
    var callback = cursorMove.bind(this);
    this.canvas.addEventListener('mousedown', function(event) {
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

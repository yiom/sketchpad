//    The MIT License (MIT)
//
//    Copyright (c) 2014-2016 YIOM
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy
//    of this software and associated documentation files (the "Software"), to deal
//    in the Software without restriction, including without limitation the rights
//    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//    copies of the Software, and to permit persons to whom the Software is
//    furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in
//    all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//    THE SOFTWARE.

function Sketchpad(config) {
  // Enforces the context for all functions
  for (var key in this.constructor.prototype) {
    this[key] = this[key].bind(this);
  }

  // Warn the user if no DOM element was selected
  if (!config.hasOwnProperty('element')) {
    console.error('SKETCHPAD ERROR: No element selected');
    return;
  }

  if (typeof(config.element) === 'string') {
    this.element = $(config.element);
  }
  else {
    this.element = config.element;
  }

  // Width can be defined on the HTML or programatically
  this._width = config.width || this.element.attr('data-width') || 0;
  this._height = config.height || this.element.attr('data-height') || 0;

  // Pen attributes
  this.color = config.color || this.element.attr('data-color') || '#000000';
  this.penSize = config.penSize || this.element.attr('data-penSize') || 5;

  // ReadOnly sketchpads may not be modified
  this.readOnly = config.readOnly ||
                  this.element.attr('data-readOnly') ||
                  false;
  if (!this.readOnly) {
      this.element.css({cursor: 'crosshair'});
  }

  // Stroke control variables
  this.strokes = config.strokes || [];
  this._currentStroke = {
    color: null,
    size: null,
    lines: [],
  };

  // Undo History
  this.undoHistory = config.undoHistory || [];

  // Animation function calls
  this.animateIds = [];

  // Set sketching state
  this._sketching = false;

  // Setup canvas sketching listeners
  this.reset();
}

//
// Private API
//

Sketchpad.prototype._getPointRelativeToCanvas = function(point) {
  return {
    x: point.x / this.canvas.width,
    y: point.y / this.canvas.height
  };
};

Sketchpad.prototype._normalizePoint = function(point) {
  return {
    x: point.x * this.canvas.width,
    y: point.y * this.canvas.height
  };
};

Sketchpad.prototype._getCursorPositionRelativeToCanvas = function(event) {
  var cursorPosition = {
    x: event.pageX - $(this.canvas).offset().left,
    y: event.pageY - $(this.canvas).offset().top,
  };

  return this._getPointRelativeToCanvas(cursorPosition);
};

Sketchpad.prototype._getLineSizeRelativeToCanvas = function(size) {
  return size / this.canvas.width;
};

Sketchpad.prototype._normalizeLineSize = function(size) {
  return size * this.canvas.width;
};

Sketchpad.prototype._computeMidPoint = function(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  };
};

Sketchpad.prototype._addStroke = function(stroke) {
  if (stroke.lines.length > 0) {
    this.strokes.push($.extend(true, {}, stroke));
  }
};

Sketchpad.prototype._animate = function(currentStrokeId, currentLineId, strokeColor, strokeSize) {
  this.clear();

  // Draw complete strokes
  for (var i = 0; i < currentStrokeId; i++) {
    this.drawStroke(this.strokes[i]);
  }

  // Draw current stroke
  var currentLines = this.strokes[currentStrokeId].lines;
  var displayedLines = currentLines.slice(0, currentLineId + 1);
  var displayedStroke = {
    color: strokeColor,
    size: strokeSize,
    lines: displayedLines,
  };

  this.drawStroke(displayedStroke);
};

//
// Callback Handlers
//

Sketchpad.prototype._mouseDown = function(event) {
  this._lastPosition = this._getCursorPositionRelativeToCanvas(event);
  this._currentStroke.color = this.color;
  this._currentStroke.size = this._getLineSizeRelativeToCanvas(this.penSize);
  this._currentStroke.lines = [];
  this._sketching = true;
  this.canvas.addEventListener('mousemove', this._mouseMove);
};

Sketchpad.prototype._mouseUp = function(event) {
  if (this._sketching) {
    this._addStroke(this._currentStroke);
    this._sketching = false;
  }
  this.canvas.removeEventListener('mousemove', this._mouseMove);
};

Sketchpad.prototype._mouseMove = function(event) {
  var currentPosition = this._getCursorPositionRelativeToCanvas(event);

  this._currentStroke.lines.push({
    start: $.extend(true, {}, this._lastPosition),
    end: $.extend(true, {}, currentPosition),
  });

  this._lastPosition = currentPosition;
  this.redraw(this.strokes);
  this.drawStroke(this._currentStroke);
};

Sketchpad.prototype._touchStart = function(event) {
  event.preventDefault();
  if (this._sketching) {
    return;
  }
  this._lastPosition = this._getCursorPositionRelativeToCanvas(event.changedTouches[0]);
  this._currentStroke.color = this.color;
  this._currentStroke.size = this._getLineSizeRelativeToCanvas(this.penSize);
  this._currentStroke.lines = [];
  this._sketching = true;
  this.canvas.addEventListener('touchmove', this._touchMove, false);
};

Sketchpad.prototype._touchEnd = function(event) {
  event.preventDefault();
  if (this._sketching) {
    this._addStroke(this._currentStroke);
    this._sketching = false;
  }
  this.canvas.removeEventListener('touchmove', this._touchMove);
};

Sketchpad.prototype._touchCancel = Sketchpad.prototype._touchEnd;
Sketchpad.prototype._touchLeave = Sketchpad.prototype._touchEnd;

Sketchpad.prototype._touchMove = function(event) {
  event.preventDefault();
  var currentPosition = this._getCursorPositionRelativeToCanvas(event.changedTouches[0]);

  this._currentStroke.lines.push({
    start: $.extend(true, {}, this._lastPosition),
    end: $.extend(true, {}, currentPosition),
  });

  this._lastPosition = currentPosition;
  this.redraw(this.strokes);
  this.drawStroke(this._currentStroke);
};

//
// Public API
//

Sketchpad.prototype.reset = function() {
  // Set attributes
  this.canvas = this.element[0];
  this.canvas.width = this._width;
  this.canvas.height = this._height;
  this.context = this.canvas.getContext('2d');

  // Setup event listeners
  this.redraw(this.strokes);

  if (this.readOnly) {
    return;
  }

  // Mouse
  this.canvas.addEventListener('mousedown', this._mouseDown);
  this.canvas.addEventListener('mouseout', this._mouseUp);
  this.canvas.addEventListener('mouseup', this._mouseUp);

  // Touch
  this.canvas.addEventListener('touchstart', this._touchStart);
  this.canvas.addEventListener('touchend', this._touchEnd);
  this.canvas.addEventListener('touchcancel', this._touchCancel);
  this.canvas.addEventListener('touchleave', this._touchLeave);
};

Sketchpad.prototype.drawStroke = function(stroke) {
  if (stroke.lines.length < 1) {
    return;
  }

  var lines = stroke.lines;
  var startPoint = this._normalizePoint(lines[0].start);
  var endPoint = this._normalizePoint(lines[0].end);

  this.context.lineJoin = 'round';
  this.context.lineCap = 'round';
  this.context.strokeStyle = stroke.color;
  this.context.lineWidth = this._normalizeLineSize(stroke.size);

  this.context.beginPath();
  this.context.moveTo(startPoint.x, startPoint.y);

  for (var j = 0; j < lines.length; j++) {
    startPoint = this._normalizePoint(lines[j].start);
    endPoint = this._normalizePoint(lines[j].end);
    var midPoint = this._computeMidPoint(startPoint, endPoint);
    this.context.quadraticCurveTo(startPoint.x, startPoint.y, midPoint.x, midPoint.y);
  }

  this.context.lineTo(endPoint.x, endPoint.y);
  this.context.stroke();
};

Sketchpad.prototype.redraw = function(strokes) {
  this.clear();

  for (var i = 0; i < strokes.length; i++) {
    this.drawStroke(strokes[i]);
  }
};

Sketchpad.prototype.toObject = function() {
  return {
    width: this.canvas.width,
    height: this.canvas.height,
    strokes: this.strokes,
    undoHistory: this.undoHistory,
  };
};

Sketchpad.prototype.toJSON = function() {
  return JSON.stringify(this.toObject());
};

Sketchpad.prototype.animate = function(ms, loop, loopDelay) {
  this.clear();
  var delay = ms;
  var callback = null;
  for (var i = 0; i < this.strokes.length; i++) {
    var stroke = this.strokes[i];
    for (var j = 0; j < stroke.lines.length; j++) {
      callback = this._animate.bind(this, i, j, stroke.color, stroke.size);
      this.animateIds.push(setTimeout(callback, delay));
      delay += ms;
    }
  }
  if (loop) {
    loopDelay = loopDelay || 0;
    callback = this.animate.bind(this, ms, loop, loopDelay);
    this.animateIds.push(setTimeout(callback, delay + loopDelay));
  }
};

Sketchpad.prototype.cancelAnimation = function() {
  for (var i = 0; i < this.animateIds.length; i++) {
    clearTimeout(this.animateIds[i]);
  }
};

Sketchpad.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Sketchpad.prototype.undo = function() {
  var stroke = this.strokes.pop();
  if (stroke) {
    this.undoHistory.push(stroke);
    this.redraw(this.strokes);
  }
};

Sketchpad.prototype.redo = function() {
  var stroke = this.undoHistory.pop();
  if (stroke) {
    this.strokes.push(stroke);
    this.drawStroke(stroke);
  }
};

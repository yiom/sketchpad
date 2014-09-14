# Sketchpad
A simple sketchpad project. Compatible with Ember.js.

## Authors
- [Nihey Takizawa](https://github.com/nihey)
- [Jean Lucas](https://github.com/jeanleonino)

## Instalation
To install Sketchpad in an Ember.js application that uses [Ember-cli](https://github.com/stefanpenner/ember-cli):
```
npm install sketchpad --save-dev
```

## Usage

Having a canvas on the DOM:
```
<canvas id="sketchpad"></canvas>
```
You should simply configure it by instantiating the Sketchpad:
```
var sketchpad = Sketchpad({
  element: '#sketchpad',
  width: 400,
  height: 400,
});
```
After that, the API provides a variety of functionalities:
```
// undo
sketchpad.undo();

// redo
sketchpad.redo();

// Change color
sketchpad.color = '#FF0000';

// Change stroke size
sketchpad.penSize = 10;

// Playback each sketchpad stroke (10 ms is the time between each line piece)
sketchpad.animate(10);
```

For more documentation about the project, visit: TBA

## Contribute

TBA

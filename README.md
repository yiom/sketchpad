# Sketchpad
A simple sketchpad project. ([Live Demo](http://yiom.github.io/sketchpad/))

[![NPM](https://nodei.co/npm/sketchpad.png?downloads=true)](https://nodei.co/npm/sketchpad/)

## Authors
- [Nihey Takizawa](https://github.com/nihey)
- [Jean Lucas](https://github.com/jeanleonino)

## Instalation
To install Sketchpad via [Bower](https://github.com/bower/bower):
```
$ bower install sketchpad --save
```
or use npm:
```
npm install sketchpad
```

## Usage

Having a canvas on the DOM:
```html
<canvas id="sketchpad"></canvas>
```
You should simply configure it by instantiating the Sketchpad:
```js
var sketchpad = new Sketchpad({
  element: '#sketchpad',
  width: 400,
  height: 400,
});
```
After that, the API provides a variety of functionalities:
```js
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

## Contributing

* Fork this repository.
* Install with `npm install`
* Send a PR


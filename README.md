# Sketchpad
[![Backers on Open Collective](https://opencollective.com/sketchpad/backers/badge.svg)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/sketchpad/sponsors/badge.svg)](#sponsors) 
 
A simple sketchpad project. ([Live Demo](http://yiom.github.io/sketchpad/))

[![NPM](https://nodei.co/npm/sketchpad.png?downloads=true)](https://nodei.co/npm/sketchpad/)

## Authors
- [Nihey Takizawa](https://github.com/nihey)
- [Jean Lucas](https://github.com/jeanleonino)

## Installation
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


### Contributors

This project exists thanks to all the people who contribute. 
<a href="graphs/contributors"><img src="https://opencollective.com/sketchpad/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/sketchpad#backer)]

<a href="https://opencollective.com/sketchpad#backers" target="_blank"><img src="https://opencollective.com/sketchpad/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/sketchpad#sponsor)]

<a href="https://opencollective.com/sketchpad/sponsor/0/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/sketchpad/sponsor/1/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/sketchpad/sponsor/2/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/sketchpad/sponsor/3/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/sketchpad/sponsor/4/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/sketchpad/sponsor/5/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/sketchpad/sponsor/6/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/sketchpad/sponsor/7/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/sketchpad/sponsor/8/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/sketchpad/sponsor/9/website" target="_blank"><img src="https://opencollective.com/sketchpad/sponsor/9/avatar.svg"></a>



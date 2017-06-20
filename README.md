cytoscape-canvas
================================================================================


## Description

An extension to create a canvas over or under a Cytoscape graph.
Useful for customizing nodes/edges, drawing backgrounds, etc.


## Dependencies

 * Cytoscape.js >=3.0.0

## Example

```js
var cytoscape = require('cytoscape');
var cyCanvas = require('cytoscape-canvas');

cyCanvas(cytoscape); // Register extension

var cy = cytoscape({/* ... */});

var canvas = cy.cyCanvas();

cy.on("render cyCanvas.resize", function(evt) {
	canvas.resetTransform();
	canvas.clear();

	// Draw fixed elements
	canvas.ctx.fillRect(0, 0, 100, 100); // Top left corner

	canvas.setTransform();

	// Draw model elements
	cy.nodes().forEach(function(node) {
		var pos = node.position();
		canvas.ctx.fillRect(pos.x, pos.y, 100, 100); // At node position
	});
});

```

## Usage instructions

Download the library:

 * via npm: `npm install cytoscape-canvas`,
 * via bower: `bower install cytoscape-canvas `, or
 * via direct download in the repository (probably from a tag).

`require()` the library as appropriate for your project:

CommonJS:

```js
var cytoscape = require('cytoscape');
var cyCanvas = require('cytoscape-canvas');

cyCanvas(cytoscape); // Register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-canvas'], function(cytoscape, cyCanvas) {
  cyCanvas(cytoscape); // Register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.

### Initialisation

```js
var cy = cytoscape({/* ... */});

var canvas = cy.cyCanvas({
  zIndex: 1,
  pixelRatio: "auto",
});
```

### API

#### `canvas.ctx`

Get the canvas context. You can then use any canvas functions (e.g. `canvas.ctx.fillRect(...)`)

#### `canvas.setTransform()`

Set the context transform to **match Cystoscape's zoom & pan**. Further drawing will be on **model position.**

#### `canvas.resetTransform()`

Reset the context transform. Further drawing will be on **rendered position.**

#### `canvas.clear()`

Clear the entire canvas.

### Events

`cyCanvas.resize`: When the extension's canvas is resized

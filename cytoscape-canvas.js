;(function() { 'use strict';
	// registers the extension on a cytoscape lib ref
	var register = function(cytoscape, debounce) {
		if (!cytoscape) {
			return;
		}

		var cyCanvas = function(args) {
			var cy = this;
			var container = cy.container();
			var $container = $(container);

			var canvas = document.createElement('canvas');
			var $canvas = $(canvas);

			$container.append($canvas);

			var ctx = $canvas[0].getContext('2d');

			var defaults = {
				zIndex: 1,
				pixelRatio: window.devicePixelRatio || 1,
			};

			var options = Object.assign({}, defaults, args);

			function _resize() {
				var width = $container.width();
				var height = $container.height();

				var canvasWidth = width * options.pixelRatio;
				var canvasHeight = height * options.pixelRatio;

				canvas.width = canvasWidth;
				canvas.height = canvasHeight;

				canvas.style.width = width + 'px';
				canvas.style.height = height + 'px';

				cy.trigger("cyCanvas.resize");
			}

			var resize = debounce(_resize, 100);

			cy.on('resize', function() {
				resize();
			});

			canvas.setAttribute('style', 'position:absolute; top:0; left:0; z-index:' + options.zIndex + ';');
			_resize();

			return {
				ctx: ctx,
				// Clear the canvas
				clear: function() {
					const width = cy.width();
					const height = cy.height();
					ctx.clearRect(0, 0, width * options.pixelRatio, height * options.pixelRatio);
				},
				// Reset the context transform to an identity matrix
				resetTransform: function() {
					ctx.setTransform(1, 0, 0, 1, 0, 0);
				},
				// Set the context transform to match Cystoscape's zoom & pan
				setTransform: function() {
					const pan = cy.pan();
					const zoom = cy.zoom();
					ctx.setTransform(1, 0, 0, 1, 0, 0);
					ctx.translate(pan.x * options.pixelRatio, pan.y * options.pixelRatio);
					ctx.scale(zoom * options.pixelRatio, zoom * options.pixelRatio);
				},
			};
		};

		cytoscape('core', 'cyCanvas', cyCanvas);
	};

	if (typeof module !== 'undefined' && module.exports) { // expose as a commonjs module
		module.exports = function(cytoscape) {
			register(cytoscape, require('lodash.debounce'));
		}
	}

	if (typeof define !== 'undefined' && define.amd) { // expose as an amd/requirejs module
		define('cytoscape-canvas', function() {
			return register;
		});
	}

	if (typeof cytoscape !== 'undefined') { // expose to global cytoscape (i.e. window.cytoscape)
		register(cytoscape, _.debounce.bind(_));
	}

})();
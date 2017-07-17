(function () {
	// registers the extension on a cytoscape lib ref
	const register = function (cytoscape) {
		if (!cytoscape) {
			return;
		}

		const cyCanvas = function (args) {
			const cy = this;
			const container = cy.container();

			const canvas = document.createElement("canvas");

			container.appendChild(canvas);

			const defaults = {
				zIndex: 1,
				pixelRatio: "auto",
			};

			const options = Object.assign({}, defaults, args);

			if (options.pixelRatio === "auto") {
				options.pixelRatio = window.devicePixelRatio || 1;
			}

			function resize() {
				const width = container.offsetWidth;
				const height = container.offsetHeight;

				const canvasWidth = width * options.pixelRatio;
				const canvasHeight = height * options.pixelRatio;

				canvas.width = canvasWidth;
				canvas.height = canvasHeight;

				canvas.style.width = `${width}px`;
				canvas.style.height = `${height}px`;

				cy.trigger("cyCanvas.resize");
			}

			cy.on("resize", () => {
				resize();
			});

			canvas.setAttribute("style", `position:absolute; top:0; left:0; z-index:${options.zIndex};`);

			resize();

			return canvas;
		};

		cytoscape("core", "cyCanvas", cyCanvas);
	};

	if (typeof module !== "undefined" && module.exports) { // expose as a commonjs module
		module.exports = function (cytoscape) {
			register(cytoscape);
		};
	}

	if (typeof define !== "undefined" && define.amd) { // expose as an amd/requirejs module
		define("cytoscape-canvas", () => register);
	}

	if (typeof cytoscape !== "undefined") { // expose to global cytoscape (i.e. window.cytoscape)
		register(cytoscape);
	}
}());

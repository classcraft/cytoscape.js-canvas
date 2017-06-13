;(function(){ 'use strict';

  // registers the extension on a cytoscape lib ref
  var register = function( cytoscape ){
    if( !cytoscape ){ return; } // can't register if cytoscape unspecified

    // if you want a collection extension
    $$('collection', 'canvas', function( options ){ // could use options object, but args are up to you
      var eles = this;
      var cy = this.cy();
      
      // your extension impl...

      return this; // chainability
    });

    // if you want a core extension
    $$('core', 'canvas', function( options ){ // could use options object, but args are up to you
      var cy = this;

      // your extension impl...

      return this; // chainability
    });

  };

  if( typeof module !== 'undefined' && module.exports ){ // expose as a commonjs module
    module.exports = register;
  }

  if( typeof define !== 'undefined' && define.amd ){ // expose as an amd/requirejs module
    define('cytoscape-canvas', function(){
      return register;
    });
  }

  if( typeof cytoscape !== 'undefined' ){ // expose to global cytoscape (i.e. window.cytoscape)
    register( cytoscape );
  }

})();
THREE =  {}

THREE.Compass = function() {
  //private members
  var listeners_;
  var south_, north_, east_, west_;
  var arrow_;
  var rotateTransformation_;
  //private members for zoom toolbar
  var zoomIn_, zoomReset_, zoomOut_;
  
  //private CROT
  var __construct = function() {
    listeners_ = new Array();
    document.addEventListener("DOMContentLoaded", onDocumentLoaded,false);  
   }();
   
   //public function
   this.setRotation = function(deg) {
    // Rotate the disc of the compass.
      if(arrow_!==undefined) {
        rotate(deg,false);
      }
   };
   
   this.addRotateEvent = function(callback) {
      listeners_.push(callback);
   };
   
   this.removeRotateEvent = function(callback) {
      var ind = listeners_.indexOf(callback);
      if(ind > -1) {
        listeners_.splice(ind,1);
      }
   };
   //private methods
   
   function onDocumentLoaded(event) {
      var compassNode = document.getElementById('compassId');
      
      compassNode.addEventListener("load", function() {
        
        var svgDoc = compassNode.contentDocument;
        south_ = svgDoc.getElementById('south');
        north_ = svgDoc.getElementById('north');
        east_ = svgDoc.getElementById('east');
        west_ = svgDoc.getElementById('west');
        arrow_ = svgDoc.getElementById('arrow');
		rotateTransformation_ = svgDoc.getElementById('rotateTransformation');
        //add click events
        south_.addEventListener('click', onLetterClicked, false);
        north_.addEventListener('click', onLetterClicked, false);
        east_.addEventListener('click', onLetterClicked, false);
        west_.addEventListener('click', onLetterClicked, false);
      
      },false);
	  
	  var zoomNode = document.getElementById('zoomId');
	  zoomNode.addEventListener("load", function() {
        
        var svgDoc = zoomNode.contentDocument;
        zoomIn_ = svgDoc.getElementById('svg-pan-zoom-zoom-in');
		zoomReset_ = svgDoc.getElementById('svg-pan-zoom-reset-pan-zoom');
		zoomOut_ = svgDoc.getElementById('svg-pan-zoom-zoom-out');
		//add click events
        zoomIn_.addEventListener('click', onZoomInClick, false);
		zoomReset_.addEventListener('click', onZoomResetClick, false);
		zoomOut_.addEventListener('click', onZoomOutClick, false);
	  }, false);
	  
    }

	function onZoomInClick(event) {
		console.log('zoom in')
	}
	function onZoomResetClick(event) {
		console.log('zoom reset')
	}
	function onZoomOutClick(event) {
		console.log('zoom out')
	}
	
    function onLetterClicked (event) {
      var dir = event.target.id;
      switch(dir) {
        case 'north':
          rotate(0,true);
        break;
        case 'east':
          rotate(90,true);
        break;
        case 'south':
          rotate(180,true);
        break;
        case 'west':
          rotate(270,true);
        break;
      }
    }
    function rotate(deg,fireEvent) {
		//get current deg (first num) from transform which it's value is: rotate(<num> <num> <num>)
		var curDeg = rotateTransformation_.getAttribute('to').split(' ')[0];
		try { 
			curDeg=parseInt(curDeg); 
			if(isNaN(curDeg)) {curDeg=0;} //case first time, the curDeg is empty string.
		} catch(err){
			curDeg=0;
		}
		
		rotateTransformation_.setAttribute('from',''+curDeg+' 442 442');
		rotateTransformation_.setAttribute('to',''+deg+' 442 442');
		
		rotateTransformation_.beginElement();
		if(fireEvent) {
			fireRotateEvent(deg);
		}
    }
	function fireRotateEvent(deg) {
        listeners_.forEach (function(listener) {
            listener(deg);
      });
   };
};

var compass = new THREE.Compass();

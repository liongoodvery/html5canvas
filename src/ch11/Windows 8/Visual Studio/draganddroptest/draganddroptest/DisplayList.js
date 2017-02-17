//Display list for screen

function DisplayList(canvas) {
	this.objectList = new Array();
	this.theCanvas = canvas;
	
	this.addChild = function(child) {
		this.objectList.push(child);
	
	}
	
	this.removeChild = function(child) {
		var removeIndex = null;
		removeIndex = this.objectList.indexOf(child,0);
		if (removeIndex != null) {
			this.objectList.splice(removeIndex,1);
		}
	}
	
	this.draw = function() {
		for (var i = 0; i < this.objectList.length; i++) {
			tempObject = this.objectList[i];
	  		tempObject.draw();
	  	}
	}
	
	this.onMouseUp = function(event) {
		var x;
   	 	var y;
    	if (event.pageX || event.pageY) {
      		x = event.pageX;
      		y = event.pageY;
    	}
    	else {
     		x = e.clientX + document.body.scrollLeft +
           document.documentElement.scrollLeft;
      		y = e.clientY + document.body.scrollTop +
           document.documentElement.scrollTop;
    	}
		x -= this.theCanvas.offsetLeft;
		y -= this.theCanvas.offsetTop;
			
		var mouseX=x;
		var mouseY=y;
		
		for (i=0; i< this.objectList.length; i++) {
			var to = this.objectList[i];
			if ( (mouseY >= to.y) && (mouseY <= to.y+to.height) && (mouseX >= to.x) && (mouseX <= to.x+to.width) ) {
				to.onMouseUp(mouseX,mouseY)
			}
		}
	
	}
}

 
function DragAndDrop() {
	
	if (!canvasSupport()) {
			 return;
  		}
	
	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");
	
	var BULB_START_X = 40;
	var BULB_START_Y = 50;
	var BULB_Y_SPACING = 10;
	var BULB_WIDTH = 25;
	var BULB_HEIGHT = 25;

	var backGround;
	var bulbColors = new Array ("red","blue","green","yellow","orange","pink","purple");
	var bulbs;
	
	var clickBulbs;
	var clickWait = 5;
	var clickWaitedFrames = 5;
	
	var displayList		= new DisplayList(theCanvas);
	
	theCanvas.addEventListener("mouseup",onMouseUp, false);	
	theCanvas.addEventListener("mousemove",onMouseMove, false);	
  
  
  
 	function onBulbClicked(event) {
		if (clickWaitedFrames >= clickWait) {
			clickWaitedFrames = 0;
			var clickedBulb = event.target;
			if ( clickedBulb.type  == "factory" && !currentlyDragging()) {
				var tempBulb = new Ornament(clickedBulb.bulbColor,BULB_WIDTH,BULB_HEIGHT,context);
				tempBulb.addEventListener(tempBulb.EVENT_CLICKED , onBulbClicked);
				tempBulb.y =  clickedBulb.y+10;
				tempBulb.x =  clickedBulb.x+10;
				tempBulb.type = "copy";
				tempBulb.dragging = true;
				bulbs.push(tempBulb);
				displayList.addChild(tempBulb);	
				
			} else {
				if (clickedBulb.dragging) {
					clickedBulb.dragging = false;
				} else {
					if (!currentlyDragging()) {
						clickedBulb.dragging = true;
					}
				}
					
			}
		}
		
  
  	}
	
	function currentlyDragging() {
		isDragging = false
		for (var i =0; i < bulbs.length; i++) {
			if (bulbs[i].dragging) {
				isDragging = true;
			}
		}
		return isDragging;
	}
  	
	
	function onMouseUp(event) {
		displayList.onMouseUp(event);
	}
	
	function onMouseMove(event) {
		
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
		x -= theCanvas.offsetLeft;
		y -= theCanvas.offsetTop;
			
		var mouseX=x;
		var mouseY=y;
		for (var i =0; i < bulbs.length; i++) {
			
			if (bulbs[i].dragging) {
				bulbs[i].x = mouseX - BULB_WIDTH/2;
				bulbs[i].y = mouseY - BULB_HEIGHT/2;
				
			}
		}
		
		var cursor ="default";
		for (i=0; i< bulbs.length; i++) {
			var tp = bulbs[i];
			if ( (mouseY >= tp.y) && (mouseY <= tp.y+tp.height) && (mouseX >= tp.x) && (mouseX <= tp.x+tp.width) ) {
				cursor = "pointer";
			}
		}
	
		for (i=0; i< clickBulbs.length; i++) {
			var tp = clickBulbs[i];
			if ( (mouseY >= tp.y) && (mouseY <= tp.y+tp.height) && (mouseX >= tp.x) && (mouseX <= tp.x+tp.width) ) {
				cursor = "pointer";
			}
		}
		theCanvas.style.cursor = cursor;
	}
	

  	
  function  draw () {
		context.drawImage(backGround,0,0);
		displayList.draw();		
	}
  
   function gameLoop() {
		window.setTimeout(gameLoop, 20);
		clickWaitedFrames++;
 		draw();	
	}
		
	bulbs = new Array();	
	clickBulbs = new Array()
	for (var i=0;i < bulbColors.length; i++) {
		var tempBulb = new Ornament(bulbColors[i],BULB_WIDTH,BULB_HEIGHT,context);
		tempBulb.addEventListener(tempBulb.EVENT_CLICKED , onBulbClicked);
		tempBulb.x = BULB_START_X;
		tempBulb.y = BULB_START_Y + i*BULB_Y_SPACING +i*BULB_HEIGHT;
		tempBulb.type = "factory";
		clickBulbs.push(tempBulb);
		displayList.addChild(tempBulb);	
	}
	 backGround = new Image();
	 backGround.src = "background.gif";
	 gameLoop();
	
}



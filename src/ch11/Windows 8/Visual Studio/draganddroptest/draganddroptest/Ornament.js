function Ornament(color,height,width,context) {
	this.bulbColor = color;
	this.file = "bulb_"+ this.bulbColor + ".gif";
	this.height = height;
	this.width = width;
	this.x = 0;
	this.y = 0;
	this.context = context;
	this.loaded = false;
	this.image = null;
	this.EVENT_CLICKED = "clicked";
	this.type = "factory";
	this.dragging = false;

	
	this.onMouseUp = function (mouseX,mouseY) {

		this.dispatch(this.EVENT_CLICKED);
	}
	
	this.draw = function() {
		this.context.drawImage(this.image,this.x,this.y, this.width,this.height);
	}
	
	this.loadImage = function (file) {
		this.image = new Image();
		this.image.onload = this.imageLoaded;
		this.image.src = file;
	}
			
	this.imageLoaded = function() {
		this.loaded = true;
	}
			
				
	
	this.loadImage(this.file);

}

Ornament.prototype = new EventDispatcher();
Ornament.prototype.constructor = Ornament;
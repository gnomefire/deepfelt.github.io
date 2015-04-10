var xPos = [];
var yPos = [];
var sound, amplitude;
var lifespan;
var radius;
var hue;
var a = 0;
var button;
var bg = true;

function setup() {

	
  	colorMode(HSB, 100);
	canvas = createCanvas(450,450);
	canvas.parent('canvas-container');
	
	background(0);
	radSlider= createSlider(10, 500);
    	symSlider= createSlider(1, 4, 4);
    	symSlider.position(700, 50);
	radSlider.position(550, 50);
	xVelSlider = createSlider(-10, 10, 0);
	yVelSlider = createSlider(-10, 10, 0);
	xVelSlider.position(550, 80);
	yVelSlider.position(550, 110)
    	aVelSlider = createSlider(-20, 20, 0);
    	aVelSlider.position(700, 120)
	hueSlider = createSlider(0,100);
	hueSlider.position(550, 140);
	satSlider = createSlider(0,100, 90);
	satSlider.position(550, 180);
	briSlider = createSlider(0,100, 80);
	briSlider.position(550, 220);
    	lengthSlider = createSlider(0,300);
    
    	lengthSlider.position(550, 260);
    	shapeSlider = createSlider(0,2,2);
    	shapeSlider.position(700, 90);
	button1 = createButton('Redraw');
	radSlider.class("slider")
	radSlider.id("size")
	xVelSlider.class("slider");
	yVelSlider.class("slider");
	hueSlider.class("slider");
	 button1.position(550, 300);
  	button1.mousePressed(bgRedraw);
  	button1.class("myButton");
     
}


function bgRedraw(){
	if (bg === true){
		bg = false;
	} else {
		bg = true;
	}
	}
function draw(){
	if(bg === true){
		background(0);
	}


	stroke(0);
	radius = radSlider.value()
	fluctuator(radius);
	if (xPos.length > 0){
	console.log(xPos.length)
	}
}

function mouseDragged(){
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {

	xPos.push(mouseX);
	yPos.push(mouseY);
}
	// console.log(xPos, yPos)

}
function fluctuator(size, rec){
    	var shapeDepth = shapeSlider.value();
	hueVal = hueSlider.value();
	var satVal = satSlider.value();
	var briVal = briSlider.value();
    	var symPlanes = symSlider.value();   
    	var chainLength = lengthSlider.value();
	for (var i = 0; i < xPos.length; i++) {
		xPos[i]+=xVelSlider.value()/10;
		yPos[i]+=yVelSlider.value()/10;
		if (yPos[0]>height +radius || xPos[0] > width + radius
		||yPos[0]<0 - radius || xPos[0] < 0 - radius
		|| xPos.length > chainLength)
		{
			yPos.shift();
			xPos.shift();

		}

  		rectMode(CENTER);
  		lifespan = 255;
  		lifespan-=1;
  		strokeWeight(0.5);
  			// noStroke();
  			
        	 push();

  		translate(xPos[i], yPos[i]);
  		rotate(a);

		fill(noise(yPos[i]/100)*(hueVal), satVal, briVal);
        	 if (shapeDepth >=1)
        	 {
			rect(0,0, noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(a/1000));
			
            	}
            	if (shapeDepth <=1){
        		 ellipse(0,0, noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(a/1000));
            
            	}
            	pop();
            	if(symPlanes > 1)
            	{
			push();
             
			fill(noise(yPos[i]/100)*(hueVal), satVal, briVal)
			translate(width - xPos[i], yPos[i]);
                
			 rotate(-a);
             	if (shapeDepth >=1)
             	{   
			rect(0,0, noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(a/1000));
             	}
                if(shapeDepth<=1) 
                {
                    ellipse(0,0, noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(a/1000));
             	}
                
		pop();
        	}
		a+=0.0001 *aVelSlider.value();
            	if(symPlanes > 2)
            	{
                 	fill(noise(yPos[i]/100)*(hueVal), satVal, briVal)
                	push();
                	translate(yPos[i],xPos[i]);
                 	rotate(a);  
			    
                	if (shapeDepth >=1){
			         rect(0,0, noise(yPos[i]/10)*size*sin(millis()/1000),
                             	noise(yPos[i]/10)*size*cos(millis()/1000));
                }
                	if (shapeDepth <=1){
                    		ellipse(0,0, noise(yPos[i]/10)*size*sin(millis()/1000),
                        	noise(yPos[i]/10)*size*cos(millis()/1000));
                }
                pop();
           
            
            
                push();
                translate(width - yPos[i], xPos[i])
                rotate(-a);
                if(shapeDepth >= 1){
			 rect(0,0, noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));
                }
                if(shapeDepth <= 1) {
                    ellipse(0,0, noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));
                }
                pop();    
            }
	}

		}





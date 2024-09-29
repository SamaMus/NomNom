/*
    Code sample for CSCI 2408 Computer Graphics 
    (c)2022-24 by Araz Yusubov 
    DISCLAIMER: All code examples we will look at are quick hacks intended to present working prototypes.
    Hence they do not follow best practice of programming or software engineering.    
*/


var canvas; //hold the canvas element

var context; //holds the 2d drawing context


//call init fuction when the window loads
window.onload = init;

var GRID_SIZE = 30; //size of each cells 
var GRID_COLOR = 'grey';
var LINE_COLOR = 'red';


var lineX0, lineY0;
var lineX1, lineY1;


var startNewLine = false;


//function for initialization
function init(){
canvas = document.getElementById("gl-canvas");

//get reference to the 2D context of the canvas
context = canvas.getContext("2d");

if (context) {
    drawGrid(); //empty
    canvas.onclick = onClick; //event listener for the canvas

}
}

function onClick (e) {
    startNewLine = !startNewLine;
 
    //we will get canvas boundaries to calculate coordinates

    rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    //calculate the coordinates within the grid
    x = Math.floor( x / GRID_SIZE);
    y = Math.floor(y / GRID_SIZE);

    if (startNewLine) {
        lineX0 = x;
        lineY0 = y; //starting x and y coordinates

        drawPixel(lineX0, lineY0);//draw line starting pixel

    }
        else {
            lineX1 = x;
            lineY1 = y; //ending coordinates

            drawBresenham();
        }
}

function drawPixel(x, y){
    context.fillStyle = LINE_COLOR;
    
    //scaling x and y coordinate to canvas size
    x = x * GRID_SIZE;
    y = y * GRID_SIZE;
    context.fillRect(x, y, GRID_SIZE, GRID_SIZE);
}

function drawBresenham(){
    x = lineX0;
    y = lineY0;
    dx = lineX1 - lineX0;
    dy = lineY1 - lineY0;


    d = dx;
    while ( x<= lineX1){
        drawPixel(x, y);
        x = x + 1;
        d = d - 2*dy;

    //we check if we need to move to next line 
        if (d<0) {
            y = y + 1;
            d = d + 2*dx;
        }
    }

}

function drawLine(x0, y0, x1, y1) {
    context.beginPath();//start new path for drawing
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
}

function drawGrid() {

    //Set the line styles 
    context.strokeStyle = GRID_COLOR;
    context.lineWidth = 1;//width of the grid lines



    //now we will draw vertical lines for the grid

x = 0;
while (x <= canvas.clientWidth) {

    drawLine(x, 0, x, canvas.clientHeight);//draw each vertical line


    x = x + GRID_SIZE;
}
    
//now we'll draw the horizontal lines

y = 0;

while(y <= canvas.clientHeight) {
    drawLine(0, y, canvas.clientWidth, y);

    y = y + GRID_SIZE;  //draw each horizontal line

}

}


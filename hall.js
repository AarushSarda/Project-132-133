img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("Hall.jpeg");
}
function setup() {
    canvas = createCanvas(600 , 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img , gotResults);
}
function gotResults(error , results) {
    if (error) {
        console.log (error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(img,0,0,600,400);
    if(status != ""){
        for(i=0 ; i<objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("#ea05fa");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + " %" , objects[i].x + 15 , objects[i].y + 15); 
            noFill();
            stroke("#ea05fa");
            rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}
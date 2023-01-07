var width = window.innerWidth;
var height = window.innerHeight;

var angle = 60;
var fov = 120;
var radius = 300;

function update()
{
  wedge.angle(fov);
  wedge.rotation(angle - fov/2);
  wedge.radius(radius);
}

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

var twidth = 200;
var theight = 100;

var text = new Konva.Text({
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: '',
  fill: 'black',
});

function writeMessage(message) {
  text.text(message);
}

layer.add(text);

var table = new Konva.Rect({
  x: stage.width() / 2 - twidth/2,
  y: stage.height() / 2 - theight/2,
  width : twidth,
  height: theight,
  fill: "#EEEEEE",
  stroke: "black",
  strokeWidth: 1
})

layer.add(table);

var wedge = new Konva.Wedge({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 300,
  fill: '#BBCCFF50',
  stroke: 'black',
  strokeWidth: 1,
});
 
var radiusDown;
var deltaDown;
var fovDown;
var isWedgeDown = false;
var downPt; 
var isShiftDown = false;
wedge.on('pointerdown', function(){
  isWedgeDown = true;
  radiusDown = wedge.radius();
  downPt = stage.getPointerPosition();

  var x  = downPt.x - wedge.x();
  var y =  wedge.y() - downPt.y;

  deltaDown = Math.sqrt(x*x + y*y);
  fovDown = fov;
});

wedge.on('pointermove', function(){
  if(isWedgeDown)
  {
    var currentPoint = stage.getPointerPosition();
    // new angle between center and point
    var x  = currentPoint.x - wedge.x();
    var y =  wedge.y() - currentPoint.y;
    var rad  = Math.atan(y/x);
    writeMessage(" x " + x + " y " + y + " rad " + rad + " angle " + angle );
    if( x < 0 ) rad += Math.PI;
    var newDelta = Math.sqrt(x*x + y*y);

    if(isShiftDown)
    {

      fov = Math.min( 160, Math.max(30, fovDown + newDelta - deltaDown));

    }
    else
    {
      angle = -rad * 180 / Math.PI;
        radius = radiusDown + newDelta - deltaDown;
    }
    update();
  }
});

wedge.on('pointerleave', function(){isWedgeDown = false; });
wedge.on('pointerup', function(){isWedgeDown = false; });



// add the shape to the layer
layer.add(wedge);

// add the layer to the stage
stage.add(layer);

update();
 
window.addEventListener("keydown", (event) =>{
  if(event.code == "ShiftLeft" ) {
    isShiftDown = true;
    downPt = stage.getPointerPosition();

    var x  = downPt.x - wedge.x();
    var y =  wedge.y() - downPt.y;
  
    deltaDown = Math.sqrt(x*x + y*y);
    fovDown = fov;
    }
});

window.addEventListener("keyup", (event) =>{
  if(event.code == "ShiftLeft" ) {
    isShiftDown = false;
    downPt = stage.getPointerPosition();

    var x  = downPt.x - wedge.x();
    var y =  wedge.y() - downPt.y;
  
    deltaDown = Math.sqrt(x*x + y*y);
    fovDown = fov;
    }
});



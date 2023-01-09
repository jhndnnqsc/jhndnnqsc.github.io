var width = window.innerWidth;
var height = window.innerHeight;

const input = document.querySelector("input")
input.addEventListener("change", function() {
  var imageObj2 = new Image();
  imageObj2.onload = () =>
  {
    layer.add(new Konva.Image({
      x: stage.width() / 2 - twidth/2,
      y: stage.height() / 2 + theight / 2,
      image: imageObj2,
      draggable: true,
    }));
  };
  imageObj2.src = URL.createObjectURL(input.files[0]);
});

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
});

stage.add(grid.get());

var layer = new Konva.Layer();
stage.add(layer);

var imageTr = new Konva.Transformer();
layer.add(imageTr);

var cam = new Camera(stage);

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

//var table;
var imageObj = new Image();
imageObj.onload = () =>
{
  table = new Konva.Image({
    x: stage.width() / 2 - twidth/2,
    y: stage.height() / 2 + theight / 2,
    image: imageObj,
    width: 1920/4,
    height: 880/4,
    draggable: true,
  })
  layer.add(table);
};

imageObj.src = "./confroom.png"

stage.on('click tap', function (e) {
  // if click on empty area - remove all selections
  if (e.target === stage) {
    imageTr.nodes([]);
    return;
  }
  if( e.target.className === "Image") imageTr.nodes([e.target]);
});

window.addEventListener("keydown", (event) =>{
  if(event.code == "ShiftLeft" ) {
    cam.setShiftDown(true);
  }
});

window.addEventListener("keyup", (event) =>{
  if(event.code == "Delete")
  {
    var sel = imageTr.nodes();
    (sel).forEach(element => {
      element.destroy();
    });
    imageTr.nodes([]);
  }
  if(event.code == "ShiftLeft" ) {
    cam.setShiftDown(false);
  }
});

layer.batchDraw();


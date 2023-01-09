class Camera {
  setShiftDown(isShiftDown)
  {
    this.isShiftDown = isShiftDown;
    this.downPt = stage.getPointerPosition();

    var x  = this.downPt.x - this.wedge.x();
    var y =  this.wedge.y() - this.downPt.y;
  
    this.deltaDown = Math.sqrt(x*x + y*y);
    this.fovDown = this.fov;
  }

  update()
  {
    this.wedge.angle(this.fov);
    this.wedge.rotation(this.angle - this.fov/2);
    this.wedge.radius(this.radius);
  };

  constructor(stage)
  {
    this.angle = 60;
    this.fov = 120;
    this.radius = 300;
    this.wedge = null;
    this.radiusDown = 0;
    this.deltaDown = 0;
    this.fovDown = 0;
    this.isWedgeDown = false;
    this.downPt = {};
    this.stage = null;
    this.isShiftDown = false;
  
    this.stage = stage;

    this.wedge = new Konva.Wedge({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radius: 300,
      fill: '#BBCCFF50',
      stroke: 'black',
      strokeWidth: 1,
    });
  

    this.wedge.on('pointerdown', ()=> {
      this.isWedgeDown = true;
      this.radiusDown = this.wedge.radius();
      this.downPt = this.stage.getPointerPosition();
    
      var x  = this.downPt.x - this.wedge.x();
      var y =  this.wedge.y() - this.downPt.y;
    
      this.deltaDown = Math.sqrt(x*x + y*y);
      this.fovDown = this.fov;
    });

    this.wedge.on('pointermove', ()=> {
      if(this.isWedgeDown)
      {
        var currentPoint = this.stage.getPointerPosition();
        // new angle between center and point
        var x  = currentPoint.x - this.wedge.x();
        var y =  this.wedge.y() - currentPoint.y;
        var rad  = Math.atan(y/x);
//        writeMessage(" x " + x + " y " + y + " rad " + rad + " angle " + angle );
        if( x < 0 ) rad += Math.PI;
        var newDelta = Math.sqrt(x*x + y*y);
    
        if(this.isShiftDown)
        {
          this.fov = Math.min( 160, Math.max(30, this.fovDown + newDelta - this.deltaDown));
        }
        else
        {
          this.angle = -rad * 180 / Math.PI;
          this.radius = this.radiusDown + newDelta - this.deltaDown;
        }
        this.update();
      }
    });

    this.wedge.on('pointerleave', () =>{this.isWedgeDown = false; });
    this.wedge.on('pointerup', () =>{this.isWedgeDown = false; });


    var camlayer = new Konva.Layer();

    // add the shape to the layer
    camlayer.add(this.wedge);
    
    // add the layer to the stage
    stage.add(camlayer);
    
    this.update();
  }
}



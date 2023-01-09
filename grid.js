const grid = {

  get : function()
  {
    var layer = new Konva.Layer();
    var w = stage.width();
    var h = stage.height();
    var background = new Konva.Rect({
      x: 0,
      y: 0,
      width: w,
      height: h,
      fill: "#EFE",
      listening: false,
    });
    layer.add(background);


    var size = 15;
    var x = 0;
    while(x < w)
    {
      layer.add( new Konva.Line({
        points: [x, 0, x, h],
        stroke: "#BEB",
        strokeWidth: 1,
        listening: false,
      }));
      x += size;
    }

    var y = 0;
    while(y < h)
    {
      layer.add( new Konva.Line({
        points: [0, y, w, y],
        stroke: "#BEB",
        strokeWidth: 1,
        listening: false,
      }));
      y += size;
    }

    return layer;
  }

};


const grid = {

  size: 15,

  getLineColor: function(value)
  {
    var step = value / this.size;
    if(step % 10 === 0 ) return "#8CB";
    else if( step % 5 === 0 ) return "#BEB";
    return "#CFC";

  },

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

    var x = 0;
    while(x < w)
    {
      layer.add( new Konva.Line({
        points: [x, 0, x, h],
        stroke: this.getLineColor(x),
        strokeWidth: 1,
        listening: false,
      }));
      x += this.size;
    }

    var y = 0;
    while(y < h)
    {
      layer.add( new Konva.Line({
        points: [0, y, w, y],
        stroke: this.getLineColor(y),
        strokeWidth: 1,
        listening: false,
      }));
      y += this.size;
    }

    return layer;
  }

};


class Sensor {
  constructor(car) {
    this.car = car;
    this.rawCount = 5;
    this.rawLength = 100;
    this.rawSpread = Math.PI / 4;
    this.raws = [];
    this.readings = [];
  }
  update(roadBorders, traffic) {
    // castRaws function
    this.raws = [];
    this.readings = [];
    for (let i = 0; i < this.rawCount; i++) {
      const rayAngle = - this.rawSpread / 2 + i * this.rawSpread / (this.rawCount-1) + this.car.angle;
      const start = {x:this.car.x, y:this.car.y};
      const end = {x:this.car.x - Math.sin(rayAngle)*this.rawLength, y:this.car.y - Math.cos(rayAngle)*this.rawLength}
      this.raws.push([start, end]);
    }
    // 检测边界点
    for (let i = 0; i < this.raws.length; i++) {
      this.readings.push(this.#getReading(this.raws[i], roadBorders, traffic))
    }
  }
  
  #getReading(raw, roadBorders, traffic) {
    let touches = [];
    for(let i = 0; i < roadBorders.length; i++) {
      const touch = getIntersection(raw[0], raw[1], roadBorders[i][0], roadBorders[i][1])
      if (touch) touches.push(touch);
    }
    for (let i = 0; i < traffic.length; i++) {
      for (let j = 0; j < traffic[i].polygon.length; j++) {
        const touch = getIntersection(raw[0], raw[1], traffic[i].polygon[j], traffic[i].polygon[(j+1) % traffic[i].polygon.length]);
        if (touch) touches.push(touch);
      }
    }
    if (touches.length == 0) {
      return null;
    }
    else {
      let offsets = touches.map(item => item.offset)
      let minOffset = Math.min(...offsets)
      return touches.find(item => item.offset == minOffset)
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.rawCount; i++) {
      let end = this.raws[i][1];
      if (this.readings[i]) end = this.readings[i]
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'yellow';
      ctx.moveTo(this.raws[i][0].x, this.raws[i][0].y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.moveTo(this.raws[i][1].x, this.raws[i][1].y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke();
    }
  }
}
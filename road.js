class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;
    this.left = x - width / 2;
    this.right = x + width / 2;
    this.top = -100000;
    this.bottom = 100000;

    const topLeft = {x: this.left, y: this.top};
    const topRight = {x: this.right, y: this.top};
    const bottomLeft = {x: this.left, y: this.bottom};
    const bottomRight = {x: this.right, y: this.bottom};
    this.borders = [
      [topLeft, bottomLeft], 
      [topRight, bottomRight]
    ]
  }

  getLaneCenter(laneIndex) {
    let laneWidth = this.width / this.laneCount;
    return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount-1)*laneWidth;
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    // 将画车道线与画边界线的过程分离开
    for (let i = 1; i <= this.laneCount - 1; i++) {
      ctx.setLineDash([20, 20])
      ctx.beginPath();
      ctx.moveTo(this.left + (this.right-this.left) * i / this.laneCount, this.top);
      ctx.lineTo(this.left + (this.right-this.left) * i / this.laneCount, this.bottom);
      ctx.stroke();
    }
    ctx.setLineDash([])
    this.borders.forEach(item => {
      ctx.beginPath();
      ctx.moveTo(item[0].x, item[0].y);
      ctx.lineTo(item[1].x, item[1].y);
      ctx.stroke();
    })
  }
}
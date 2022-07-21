const carCanvas = document.getElementById('carCanvas');
carCanvas.height = window.innerHeight;
carCanvas.width = 200;
const networkCanvas = document.getElementById('networkCanvas');
networkCanvas.height = window.innerHeight;
networkCanvas.width = 300;

const carCtx = carCanvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const N = 1;
const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestCar")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestCar"));
    if (i !== 0) {
      Network.mutate(cars[i].brain, 0.2);
    }
  }
}

let traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, 'dummy', 2),
  new Car(road.getLaneCenter(2), -300, 30, 50, 'dummy', 2),
  new Car(road.getLaneCenter(0), -500, 30, 50, 'dummy', 2),
  new Car(road.getLaneCenter(1), -600, 30, 50, 'dummy', 2),
  new Car(road.getLaneCenter(0), -700, 30, 50, 'dummy', 2),
  new Car(road.getLaneCenter(2), -800, 30, 50, 'dummy', 2),
  new Car(road.getLaneCenter(0), -900, 30, 50, 'dummy', 2),
  new Car(road.getLaneCenter(2), -1000, 30, 50, 'dummy', 2),
];


// 使用requestAnimationFrame完成渲染更新
animate();
function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'ai'));
  }
  return cars
}
function save() {
  localStorage.setItem("bestCar", JSON.stringify(bestCar.brain))
}
function discard() {
  localStorage.setItem("bestCar", '')
}

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  cars.forEach(car => car.update(road.borders, traffic));

  bestCar = cars.find(c => c.y === Math.min(...cars.map(c => c.y)));

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -bestCar.y+carCanvas.height*0.7);
  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  
  carCtx.globalAlpha = 0.2;
  cars.forEach(car => car.draw(carCtx));
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, "blue", true);

  carCtx.restore();

  // Visualizer.drawNetwork(networkCtx, car.brain)
  requestAnimationFrame(animate);
}
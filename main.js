import {Ball} from "./Ball.js";
import { Controller } from "./Controller.js";
import { clearCanvas } from "./canvas.js";
import { mouse } from "./mouse.js";
import { balls, whiteBall } from "./setupBalls.js";
import { drawCloth, drawWood } from "./table.js";



const controller = new Controller(whiteBall);



// //Ball wird erzeugt und brauch parameter 
// const b = new Ball({
//     pos: {x: 100, y:200},
//     vel: {x:4, y:-1},
//     color: "red"
// });


balls.forEach((ball) => ball.draw())

function loop() {
    clearCanvas();
    drawCloth();
    drawWood();
    balls.forEach(b => b.update());
    balls.forEach(b => b.draw());
    controller.update();
    controller.draw();
    controller.active = balls.every(b => b.idle);
    //RequestAniFrame sorgt dafür, dass loop immer wieder aussgeführt wird 
    // mit ca 60fps ruckelfrei
    requestAnimationFrame(loop)
}
loop()
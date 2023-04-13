import {Ball} from "./Ball.js";
import { clearCanvas } from "./canvas.js";
import { drawCloth, drawWood } from "./table.js";




//Ball wird erzeugt und brauch parameter 
const b = new Ball({
    pos: {x: 100, y:200},
    vel: {x:4, y:0},
    color: "red"
});
function loop() {
    clearCanvas();
    drawCloth();
    drawWood();
    b.update();
    b.draw()
    //RequestAniFrame sorgt dafür, dass loop immer wieder aussgeführt wird 
    // mit ca 60fps ruckelfrei
    requestAnimationFrame(loop)
}
loop()